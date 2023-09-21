import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-prtbuena',
  templateUrl: './prtbuena.page.html',
  styleUrls: ['./prtbuena.page.scss'],
})
export class PrtbuenaPage implements OnInit, AfterViewInit {

  @ViewChild('imag', { read: ElementRef, static: true}) imag: ElementRef;
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('iniciar', { read: ElementRef, static: true}) iniciar: ElementRef;

  public usuario: Usuario;
  private aceptado: boolean = false;

  constructor(private activeroute: ActivatedRoute, private router: Router, private toastController: ToastController,
    private animationController: AnimationController, private db: DatabaseService) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        this.aceptado = this.router.getCurrentNavigation().extras.state.aceptado;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
  async ngOnInit() {
    if(this.aceptado){
      this.usuario.password = await this.db.getContraseña(this.usuario.correo);
    }
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

    //const image = this.animationController
    //.create()
    //.addElement(this.imag.nativeElement)
    //.iterations(Infinity)
    //.duration(6000)
    //.keyframes([
      //{ offset: 0, transform: 'translate(-150%) rotate(360deg)', opacity: '1'},
      //{ offset: 0.5, transform: 'translate(150%) rotate(0)', opacity: '0.5'},
      //{ offset: 1,transform: 'translate(-150%) rotate(360deg)', opacity: '1'}
    //]);
  //image.play();
  }
}

