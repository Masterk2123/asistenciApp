import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';
import { AuthenticationService } from '../services/authetication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { showAlert, showToast } from '../model/Mensajes';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('iniciar', { read: ElementRef, static: true}) iniciar: ElementRef;
  @ViewChild('contra', { read: ElementRef, static: true}) contra: ElementRef;
  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController,
    private animationController: AnimationController, private databaseService: DatabaseService, 
    private authenticationService: AuthenticationService) {
      this.usuario = new Usuario();
      this.usuario.correo = '';
      this.usuario.password = '';
      this.usuario.nombre = '';
      this.usuario.preguntaSecreta = '';
      this.usuario.respuestaSecreta = '';
      this.usuario.sesionActiva = '';
     }

  public ngAfterViewInit(): void {
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

      const aniIniciar = this.animationController
      .create()
      .addElement(this.iniciar.nativeElement)
      .iterations(Infinity)
      .duration(5000)
      .keyframes([
        { offset: 0, color: 'white', transform: 'scale(1)'},
        { offset: 0.5, color: 'white', transform: 'scale(1.1)'},
        { offset: 1, color: 'white', transform: 'scale(1)'}
      ]);
    aniIniciar.play();

      const aniContra = this.animationController
      .create()
      .addElement(this.contra.nativeElement)
      .iterations(Infinity)
      .duration(8000)
      .keyframes([
        { offset: 0, color: '#031E83', transform: 'scale(1)'},
        { offset: 0.5, color: '#0527A5', transform: 'scale(1.1)'},
        { offset: 1, color: '#031E83', transform: 'scale(1)'}
      ]);
    aniContra.play();
  }

  ngOnInit() {
    this.usuario.correo = 'atorres@duocuc.cl';
    this.usuario.password = '1234';
  }

  async ingresar() {
    const msg: string = await this.databaseService.validateUser(this.usuario.correo, this.usuario.password);
    if (msg) {
      showAlert('Inicio de sesión', msg);
    } else {
      const usu = await this.databaseService.readUser(this.usuario.correo, this.usuario.password);
      showToast(`¡Bienvenido(a) ${usu.nombre}!`);
      this.authenticationService.login(this.usuario.correo, this.usuario.password);
    }
  }

  async eliminar() {
    this.router.navigate(['eliminar-usuarios']);
  }

  registrar() {
    this.router.navigate(['crear-usuarios']);
  }

} 
