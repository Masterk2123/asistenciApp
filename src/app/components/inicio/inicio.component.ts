import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, RouterOutlet, ActivationStart } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Usuario } from '../../model/Usuario';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { StorageService } from 'src/app/services/storage.service';
import { showToast } from 'src/app/model/Mensajes';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, AfterViewInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('nombre', { read: ElementRef, static: true}) nombre: ElementRef;
  @ViewChild('cerrar', { read: ElementRef, static: true}) cerrar: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;
  public datos = '';
  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute, private router: Router, private alertController: AlertController,
    private animationController: AnimationController, private toastController: ToastController,
    private loadingController: LoadingController, private authenticationService: AuthenticationService, private storage: StorageService) {
      this.activeroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state){
          this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        }
      });
    }


  ngOnInit(): void {
    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart && e.snapshot.outlet === "mi-clase")
    //     this.outlet.deactivate();
    // });
    //this.usuario = await this.storage.getSecureAuthUser();
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

  ionViewWillLeave() {
    this.detenerEscaneoQR();
  }

  public ngAfterViewInit(): void {
    const aniNom = this.animationController
      .create()
      .addElement(this.nombre.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'scale(0) translate(-100%) rotate(180deg)','scale(1) translate(0%) rotate(0)')
      .fromTo('opacity',0.2,1)
      .fromTo('color','white','gray');
    aniNom.play();

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

  ionViewDidEnter(){
    this.limpiarDatos();
  }

  public salir(){
    this.limpiarDatos();
    this.authenticationService.cerrarSesion();
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  //Desde aqui comienza el QR ---------------------------------------------------
  //Chekear permisos para el QR
  async checkPermission() {
    return new Promise(async (resolve) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  //Se obtienen los datos del QR
  public async comenzarEscaneoQR() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.escaneando = true;
      BarcodeScanner.hideBackground();
      document.body.style.opacity = "0.6"; 
      //document.getElementById("ContentInicio").style.opacity = "0"; 
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      if (result.hasContent) {
        this.escaneando = false;
        this.datosQR = result.content;
        //Luego de encontrarlo, buscamos que se carguen los datos a la otra página
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: this.usuario,
            qrCode: this.datosQR
          }
        };
        this.router.navigate(['/home/mi-clase'], navigationExtras);
      } 
      else {
        showToast('No fue posible encontrar datos de código QR');
      }
    } 
    else {
      showToast('No fue posible escanear, verifique que la aplicación tenga permiso para la cámara');
    }
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
  }

  detenerEscaneoQR() {
    document.body.style.opacity = "1"; 
    BarcodeScanner.stopScan();
    this.escaneando = false;
  }

}

