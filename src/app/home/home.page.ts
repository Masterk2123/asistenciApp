import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, ActivationStart, RouterOutlet } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authetication.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit{
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('bienvenido', { read: ElementRef, static: true}) bienvenido: ElementRef;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute, private router: Router, private alertController: AlertController,
    private animationController: AnimationController, private toastController: ToastController,
    private loadingController: LoadingController, private authenticationService: AuthenticationService, 
    private storage: StorageService) {
    }


  async ngOnInit(): Promise<void> {
    this.usuario = await this.storage.getSecureAuthUser();
    this.usuario.imprimirUsuario();
    //this.salir();

    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
    //     this.outlet.deactivate();
    // });


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
    const animBienv = this.animationController
      .create()
      .addElement(this.bienvenido.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'scale(0.5) rotate(-180deg)','scale(1) rotate(0)')
      .fromTo('color','white','orange')
      .fromTo('opacity',0.2,1);
    animBienv.play();

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['home/inicio'],navigationExtras);
  }

  segmentChanged($event) {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        qr: ''
      }
    };

    this.router.navigate(['home/' + $event.detail.value],navigationExtras);
  }

  public salir(){
    this.authenticationService.cerrarSesion();
  }
}
