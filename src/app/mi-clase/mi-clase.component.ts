import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, ActivationStart, RouterOutlet } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Usuario } from '../../model/Usuario';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { log } from 'src/app/model/Mensajes';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.component.html',
  styleUrls: ['./mi-clase.component.scss'],
})
export class MiClaseComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('cerrar', { read: ElementRef, static: true}) cerrar: ElementRef;

  public usuario: Usuario;
  public qrCode;

  constructor(private activeroute: ActivatedRoute, private router: Router, private alertController: AlertController,
    private animationController: AnimationController, private toastController: ToastController,
    private authenticationService: AuthenticationService){
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        try{
          this.qrCode = JSON.parse(this.router.getCurrentNavigation().extras.state.qrCode);
        } catch(e){
          log('Mi-clase', 'No existe código Qr a leer')
        }
      }
      });
  }

  ngOnInit() {
    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart && (e.snapshot.outlet === "inicio" || e.snapshot.outlet === "comentarios-posts"))
    //     this.outlet.deactivate();
    // });
  }

  ionViewDidLeave(){
    this.router.navigate([
      {
        outlets: {
          modal: null,
        },
      },
    ]);
  }

  public salir(){
    this.authenticationService.cerrarSesion();
  }

  public inicio(){
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        qrCode: ''
      }
    };

    this.router.navigate(['/home/inicio'], navigationExtras);
  }

  public ngAfterViewInit(): void {

    const aniCerrar = this.animationController
      .create()
      .addElement(this.cerrar.nativeElement)
      .iterations(Infinity)
      .duration(2000)
      //.fromTo('color','yellow','orange')
      .keyframes([
        { offset: 0, color: '#031E83'},
        { offset: 0.5, color: '#0527A5'},
        { offset: 1, color: '#031E83'}
      ]);
    aniCerrar.play();
  }

}

