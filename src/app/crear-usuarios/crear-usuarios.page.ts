import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { showAlert, showAlertDUOC, showAlertError } from '../model/Mensajes';
import { capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.page.html',
  styleUrls: ['./crear-usuarios.page.scss'],
})
export class CrearUsuariosPage implements AfterViewInit, OnInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;

  public correo = '';
  public password = '';
  public nombre = '';
  public preguntaSecreta = '';
  public respuestaSecreta = '';
  public sesionActiva = '';

  constructor(private router: Router, private db: DatabaseService,  private animationController: AnimationController) { }

  ngOnInit() {
    
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

  async registerNewUser() {
    const usu: Usuario = new Usuario();
    const msg = usu.validateUserFields(
      this.correo,
      this.password,
      this.nombre,
      this.preguntaSecreta,
      this.respuestaSecreta);

    if (msg !== '') {
      showAlertDUOC(msg);
      return;
    }

    await this.db.createUser(
      this.correo,
      this.password,
      this.nombre,
      this.preguntaSecreta,
      this.respuestaSecreta,
      'N'
    ).then((resp: capSQLiteChanges) => {
      if (resp.changes.changes === 1) {
        showAlertDUOC('Su cuenta fue creada con éxito');
        this.router.navigate(['login']);
      } else {
        showAlertDUOC('Su cuenta no pudo ser creada creada con éxito. Comuníquese con el Administrador del Sistema o intente nuevamente más tarde.');
      }
    }).catch((err) => {
      showAlertError('CreateUserPage.registerNewUser', err);
    });
  }

  async createTestingUsers() {
    try {
      await this.db.createUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'S');
      await this.db.createUser('jperez@duocuc.cl', '5678', 'Juan Pérez González', '¿Cuál es tu postre favorito?', 'panqueques', 'N');
      await this.db.createUser('cmujica@duocuc.cl', '0987', 'Carla Mujica Sáez', '¿Cuál es tu vehículo favorito?', 'moto', 'N');
      showAlertDUOC('Fueron creados 3 usuarios de prueba');
    } catch(err) {
      showAlertError('CreateUserPage.createTestingUsers', err);
    }
  }
  
  goToLogin() {
    this.router.navigate(['login']);
  }

}
