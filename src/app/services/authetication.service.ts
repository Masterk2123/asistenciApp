import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { capValueResult } from 'capacitor-data-storage-sqlite';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { log, showToast, showAlert, showAlertError } from '../model/Mensajes';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from './database.service';
import { StorageService } from './storage.service';

@Injectable()

export class AuthenticationService {
    authState = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private storage: StorageService,
        private databaseService: DatabaseService,
        private toastController: ToastController) 
    { 

    }

    getErrorMessage(method: string, msg: string): string {
        return `AuthenticationService error in ${this.storage.database}, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg);
        console.log(message);
        alert(message);
    }

    async StartAuthService(): Promise<boolean> {
        return await this.storage.initializePlugin();
    }

    //StartAuthService() es lo mismo pero con menor codificación
    initializeAuthentication(): Promise<boolean> {
        return new Promise(async resolve => {
            try {
                await this.storage.initializePlugin();
                this.isLogged();
                return Promise.resolve(true);
            } catch(err) {
                this.alertError('initializeAuthentication', err);
                return Promise.resolve(false);
            };
        });
    }

    async isLogged(): Promise<boolean> {
        log('isLogged', 'Revisar si el usuario inició sesión')
        return await this.storage.authUserExists().then(autenticado => {
            log('isLogged', autenticado? 'El usuario ha iniciado sesión': 'El usuario no ha iniciado sesión');
            if (autenticado) {
                this.authState.next(true);
            }
            return true;
        });
    }

    isAuthenticated(): Promise<boolean> {
        log('isAuthenticated', 'Iniciar servicio de autenticación')
        this.StartAuthService();
        log('isAuthenticated', 'Revisar si el usuario inició sesión')
        return this.storage.authUserExists().then(autenticado => {
            log('isAuthenticated', autenticado? 'El usuario ha iniciado sesión': 'El usuario no ha iniciado sesión');
            return autenticado;
        });
    }

    async login(correo: string, password: string) {
        console.log('Iniciando login');
        try {
            await this.StartAuthService();
            log('login', `Obteniendo datos del usuario`);

            const data: capValueResult = await this.storage.getItem("USER_DATA");

            if (data !== null) {
                if (data.value !== '') {
                    const usu = JSON.parse(data.value);
                    console.log(`USUARIO ${usu.nombre} HA INICIADO SESION (isLogged)`);
                    this.authState.next(true);
                    this.router.navigate(['/home']);
                    return;
                }
            }

            const usu = await this.databaseService.readUser(correo, password);
            if(usu === null) {
                showToast("El correo y la contraseña no son válidos");
                console.log('AuthenticationService.login El usuario no fue autenticado');
            } else {
                console.log('AuthenticationService.login El usuario fue autenticado');
                const resp = await this.databaseService.updateActiveSession(correo, 'S');
                if (resp.changes.changes === 1) {
                    showToast(`¡Bienvenido(a) ${usu.nombre}!`);
                    await this.storage.setItem('USER_DATA', JSON.stringify(usu));
                    await this.databaseService.logUsers();
                    this.authState.next(true);
                    this.router.navigate(['/home']);
                } else {
                    showToast(`No fue posible actualizar la sesión`);
                }
            }
        } catch(err) {
            await showAlertError('AuthenticationService.login', err);
        }
    }

    async cerrarSesion(){
        console.log('Iniciando logout');
        try {
            const data: capValueResult = await this.storage.getItem('USER_DATA');
            if (data !== null) {
                if (data.value !== '') {
                    const usu = JSON.parse(data.value);
                    const response: capSQLiteChanges = await this.databaseService.updateActiveSession(usu.correo, 'N');
                    if (response.changes.changes === 1) {
                        showToast(`¡Hasta pronto ${usu.nombre}!`);
                        await this.storage.removeItem('USER_DATA');
                        log('AuthenticationService.cerrarSesion','Se ha eliminado el USED_DATA')
                        await this.databaseService.logUsers();
                        this.router.navigate(['/login']);
                        this.authState.next(false);
                    } else {
                        console.log(`No fue posible actualizar la sesión`);
                    }
                }
            }
        } catch(err) {
            await showAlertError('AuthenticationService.logout', err);
        }
    }

}

