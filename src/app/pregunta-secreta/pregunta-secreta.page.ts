import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from '../services/database.service';
import { showToast, log } from '../model/Mensajes';

@Component({
  selector: 'app-pregunta-secreta',
  templateUrl: './pregunta-secreta.page.html',
  styleUrls: ['./pregunta-secreta.page.scss'],
})
export class PreguntaSecretaPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('iniciar', { read: ElementRef, static: true}) iniciar: ElementRef;
  @ViewChild('recuperar', { read: ElementRef, static: true}) recuperar: ElementRef;

  public usuario: Usuario = new Usuario();
  public pregunta: string;
  public respuesta: string = '';
  public respuestaSecreta: string;

  constructor(private activeroute: ActivatedRoute, private router: Router, private toastController: ToastController,
              private animationController: AnimationController, private db: DatabaseService) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      } else {
        this.router.navigate(['/home']);
      }
    });
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
      .addElement(this.recuperar.nativeElement)
      .iterations(Infinity)
      .duration(5000)
      .keyframes([
        { offset: 0, color: 'white', transform: 'scale(1)'},
        { offset: 0.5, color: 'white', transform: 'scale(1.1)'},
        { offset: 1, color: 'white', transform: 'scale(1)'}
      ]);
    aniRecuperar.play();
  }

  async ngOnInit() {
    if(this.usuario.correo===''){
      this.router.navigate(['reestablecer-contra']);
    }
    if(this.pregunta === null){
      this.router.navigate(['reestablecer-contra']);
    }
    this.pregunta =  await this.db.getPreguntaSecreta(this.usuario.correo); 

  }
  //--------------------
  public async recuperarContra(){
    const msgErr = this.validarString(this.respuesta);
    if(!msgErr){
      this.respuestaSecreta = await this.db.getRespuestaSecreta(this.usuario.correo);
      if(this.respuesta.toLowerCase() === this.respuestaSecreta.toLowerCase()){
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: this.usuario,
            aceptado: true
          }
        };
        this.router.navigate(['prtbuena'], navigationExtras);

      } else {
        this.router.navigate(['prtmalo']);
      }
    }else{
      showToast(msgErr);
      return false;
    }
  }
  //-------------------------------------------------------------------
  public validarString(validado: string): string{
    if (validado.trim() === '') {
      return 'Por favor, ingrese su respuesta';
    }
  }
  //--------------------------------------

}

