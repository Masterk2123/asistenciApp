import { Component, OnInit, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { log, showAlert, showAlertError, showAlertYesNoDUOC } from '../model/Mensajes';
import { MessageEnum } from '../model/MessageEnum';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from '../services/database.service';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-eliminar-usuarios',
  templateUrl: './eliminar-usuarios.page.html',
  styleUrls: ['./eliminar-usuarios.page.scss'],
})
export class EliminarUsuariosPage implements AfterViewInit, OnInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;

  selectedUserId: number;
  usuarios: any[];

  constructor(private router: Router, private db: DatabaseService, private animationController: AnimationController) { }

  ngOnInit(): void {
    this.selectedUserId = null;
    this.getUsuarios();
  }

  ngAfterViewInit(): void {
    const anim = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(5000)
      .keyframes([
        { offset: 0, color: 'white', transform: 'translate(-100%)', opacity: '1'},
        { offset: 0.5, color: 'white', transform: 'translate(100%)', opacity: '0.5'},
        { offset: 1, color: 'white', transform: 'translate(-100%)', opacity: '1'}
      ]);
    anim.play();
  }

  getUserId(index, item) {
    return item.correo;
  } 

  async getUsuarios() {
    try {
      const rs: DBSQLiteValues = await this.db.readUsers();
      log('DeleteUserPage.getUsuarios', `Cantidad de usuarios: ${rs.values.length}`);
      let usuarios = [];
      rs.values.forEach((value, index) => {
        let usu: Usuario = new Usuario();
        usu.setUserCS(value.correo, '', value.nombre, '', '', '', true);
        usuarios.push(usu);
      });
      this.usuarios = usuarios;
    } catch(err) {
      showAlertError('DeleteUserPage.getUsuarios', err);
    }
  }

  async eliminarUsuario($event){
    const correo = $event.correo;
    const usuToDelete: Usuario = this.usuarios.find((usu) => usu.correo === correo);
    const resp = await showAlertYesNoDUOC(`¿Está seguro que desea eliminar el usuario ${usuToDelete.nombre}?`);
    if (resp === MessageEnum.YES) {
      await this.db.deleteUser(correo);
      this.getUsuarios()
    }
  }

}
