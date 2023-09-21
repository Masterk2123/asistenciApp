import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite, CapacitorDataStorageSqlitePlugin, capDataStorageResult, capKeysResult
    , capKeysValuesResult, capOpenStorageOptions, capTablesResult, capValueResult, capValuesResult,} from 'capacitor-data-storage-sqlite';
    import { log, showAlertError } from '../model/Mensajes';
    import { Usuario } from '../model/Usuario';
    import { SQLiteService } from './sqlite.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
    platform: string;
    isNative: boolean = false;
    isService: boolean = false;
    store: CapacitorDataStorageSqlitePlugin;
    database: string;
    encrypted: boolean = false;
    mode: string;
    table: string;
    dbOptions: any;
    isRunning: boolean;
    initError: string;

    constructor(private db: SQLiteService) { }

    getErrorMessage(method: string, msg: string): string {
        return `StorageService error, Method ${method}. ${msg}`;
    }

    alertError(method: string, msg: string) {
        const message = this.getErrorMessage(method, msg + "Aplicación Programada por Alumnos en 2022 - Muestra");
        console.log(message);
        alert(message);
    }

    initializePlugin(): Promise<boolean> {
        this.database = 'asistencia';
        this.encrypted = false;
        this.mode = 'no-encryption';
        this.table = 'STORAGE_TABLE';
        this.dbOptions = {database: this.database, table: this.table, encrypted: this.encrypted, mode: this.mode};

        return new Promise(async resolve => {
            try {
                console.log('StoreService begining initializePlugin...');
                console.log(`StoreService database:${this.database} encrypted:${this.encrypted} mode:${this.mode} table:${this.table}`);
                this.platform = Capacitor.getPlatform();
                if(this.platform === 'ios' || this.platform === 'android') this.isNative = true;
                this.store = CapacitorDataStorageSqlite;
                await this.store.openStore(this.dbOptions);
                this.isService = true;
                this.isRunning = true;
                console.log('StoreService initializePlugin is ok...');
                resolve(true);
            } catch(err) {
                console.log('StoreService initializePlugin error...');
                this.initError = this.getErrorMessage('initializePlugin', err);
                this.alertError('initializePlugin', err);
                this.isRunning = false;
                resolve(false);
            }
        });
    }

    private async getStorageUser(hideSecrets: boolean): Promise<Usuario> {
        log('getStorageUser', 'Revisando USER_DATA');
        return this.getItem("USER_DATA").then((datos) => {
            if (datos !== null) {
                if (datos.value !== '') {
                    log('getStorageUser', `USER_DATA tiene datos: ${datos.value}`);
                    const json = JSON.parse(datos.value);
                    const usu = new Usuario();
                    usu.setUserCS(
                        json.correo, 
                        json.password, 
                        json.nombre, 
                        json.preguntaSecreta, 
                        json.respuestaSecreta, 
                        json.sesionActiva, 
                        hideSecrets
                    );
                    return usu;
                }
            }
            log('getStorageUser', `USER_DATA no tiene datos`);
            return null;
        }).catch(err => {
            showAlertError('StorageService.getStorageUser', err);
            return null;
        })
    }

    async getSecureAuthUser(): Promise<Usuario> {
        return this.getStorageUser(true);
    }
    
    async getUnsecureAuthUser(): Promise<Usuario> {
        return this.getStorageUser(false);
    }

    async authUserExists(): Promise<boolean> {
        return this.getStorageUser(false).then(usuario => { return !!usuario; });
    }

    async closeStore(): Promise<void> {
        return await this.store.closeStore({ database: this.database });
    }

    async isStoreOpen(): Promise<capDataStorageResult> {
        return await this.store.isStoreOpen({ database: this.database });
    }

    async isStoreExists(): Promise<capDataStorageResult> {
        return await this.store.isStoreExists({ database: this.database });
    }
  
    async setTable(): Promise<void> {
        await this.store.setTable({ table: this.table });
    }

    async setItem(key: string, value: string): Promise<void> {
        return await this.store.set({ key, value });
    }

    async getItem(key:string): Promise<capValueResult> {
        return await this.store.get({ key });
    }

    async isKey(key: string): Promise<capDataStorageResult> {
        return await this.store.iskey({ key });
    }

    async getAllKeys(): Promise<capKeysResult> {
        return await this.store.keys();
    }

    async getAllValues(): Promise<capValuesResult> {
        return await this.store.values();
    }

    async getFilterValues(filter: string): Promise<capValuesResult> {
        return await this.store.filtervalues({ filter });
    }

    async getAllKeysValues(): Promise<capKeysValuesResult> {
        return await this.store.keysvalues();
    }

    async removeItem(key: string): Promise<void> {
        return await this.store.remove({ key });
    }

    async clear(): Promise<void> {
        return await this.store.clear();
    }

    async deleteStore(): Promise<void> {
        return await this.store.deleteStore(this.dbOptions);
    }

    async isTable(): Promise<capDataStorageResult> {
        return await this.store.isTable({ table: this.table });
    }

    async getAllTables(): Promise<capTablesResult> {
        return await this.store.tables();
    }

    async deleteTable(): Promise<void> {
        return await this.store.deleteTable({ table: this.table });
    }
}

