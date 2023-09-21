import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, Data } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-reestablecer-contra',
  templateUrl: './reestablecer-contra.page.html',
  styleUrls: ['./reestablecer-contra.page.scss'],
})
export class ReestablecerContraPage implements OnInit, AfterViewInit{
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('iniciar', { read: ElementRef, static: true}) iniciar: ElementRef;
  @ViewChild('rec', { read: ElementRef, static: true}) rec: ElementRef;

  public usuario: Usuario;
  public pregunta: String;

  constructor(private router: Router, private toastController: ToastController,
              private animationController: AnimationController, private db: DatabaseService) {
    this.usuario = new Usuario();
    this.usuario.correo = '';
    this.usuario.password = '';
    this.usuario.nombre = '';
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

    const aniIniciar = this.animationController
    .create()
    .addElement(this.iniciar.nativeElement)
    .iterations(Infinity)
    .duration(8000)
    .keyframes([
      { offset: 0, color: '#031E83', transform: 'scale(1)'},
      { offset: 0.5, color: '#0527A5', transform: 'scale(1.1)'},
      { offset: 1, color: '#031E83', transform: 'scale(1)'}
    ]);
  aniIniciar.play();

    const aniRecuperar = this.animationController
    .create()
    .addElement(this.rec.nativeElement)
    .iterations(Infinity)
    .duration(5000)
    .keyframes([
      { offset: 0, color: 'white', transform: 'scale(1)'},
      { offset: 0.5, color: 'white', transform: 'scale(1.1)'},
      { offset: 1, color: 'white', transform: 'scale(1)'}
    ]);
  aniRecuperar.play();
  }

  ngOnInit() {
    this.usuario.correo = 'atorres@duocuc.cl';
    //this.recuperar();
  }

  public async recuperar(){
    if(!this.validarUsuario(this.usuario)){
      return ;
    }
    this.pregunta = await this.db.getPreguntaSecreta(this.usuario.correo);
    if(this.pregunta===null){
      this.mostrarMensaje('Debe utilizar un correo válido y ya registrado');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };

    this.router.navigate(['pregunta-secreta'], navigationExtras);
  }
  //--------------------------
  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validateEmail(this.usuario.correo);
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }
    return true;
  }
  //--------------------------
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}

