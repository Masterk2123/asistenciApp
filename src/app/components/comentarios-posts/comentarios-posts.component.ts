import { ActivationStart, RouterOutlet } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiclientService } from 'src/app/services/apiclient.service';
import { ToastController, AnimationController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comentarios-posts',
  templateUrl: './comentarios-posts.component.html',
  styleUrls: ['./comentarios-posts.component.scss'],
})
export class ComentariosPostsComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('cerrar', { read: ElementRef, static: true}) cerrar: ElementRef;
  selectedUserId: number;
  usuarios: any;
  publicacion: any = {
    userId: null,
    id: null,
    title: '',
    body: '',
    name: ''
  };

  publicaciones: any;
  publicacionSeleccionada: string;

  constructor(
    private api: ApiclientService,
    private toastController: ToastController,
    private authenticationService: AuthenticationService,
    private router: Router,
    private animationController: AnimationController) {
  }
  ngOnInit(): void {
    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart && (e.snapshot.outlet === "inicio" || e.snapshot.outlet === "mi-clase"))
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

  ionViewWillEnter() {
    this.selectedUserId = null;
    this.setPublicacion(null, null, '', '', '');
    this.getUsuarios();
    this.getPublicaciones();
  }

  cambiarUsuario($event: number) {
    this.setPublicacion($event, null, '', '', '');
  }

  limpiarPublicacion() {
    this.setPublicacion(this.selectedUserId, null, '', '', '');
  }

  setPublicacion(userId, pubId, title, body, name) {
    this.publicacion.userId = userId;
    this.publicacion.id = pubId;
    this.publicacion.title = title;
    this.publicacion.body = body;
    this.publicacion.name = name;

    const uid = userId === null? 'no seleccionado' : userId;
    const pid = pubId === null? 'nueva' : pubId;
    this.publicacionSeleccionada = `(userId: ${uid} - pubId: ${pid})`;
  }

  getUsuarios() {
    this.api.getUsuarios().subscribe(data => this.usuarios = data);
  }

  getPublicaciones() {

    this.api.getPublicaciones().subscribe((publicaciones) => {
      this.api.getUsuarios().subscribe((usuarios) => {
        publicaciones.forEach(publicacion => {
          publicacion.name = usuarios.find(u => u.id === publicacion.userId).name;
        });
        publicaciones.reverse();
        this.publicaciones = publicaciones;
      });
    });
  }

  guardarPublicacion() {
    if (this.publicacion.userId === null) {
      this.mostrarMensaje('Antes de hacer una publicación debe seleccionar un usuario.');
      return;
    }
    if (this.publicacion.title.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.body.trim() === '') {
      this.mostrarMensaje('Antes de hacer una publicación debe llenar el cuerpo.');
      return;
    }
    if (this.publicacion.id === null) {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  crearPublicacion() {
    this.api.createPublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION CREADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE CREAR LA PUBLICACION.', error)
    );
  }

  actualizarPublicacion() {
    this.api.updatePublicacion(this.publicacion).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ACTUALIZADA CORRECTAMENTE: ${data.id} ${data.title}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ACTUALIZAR LA PUBLICACION.', error)
    );
  }

  editarPublicacion($event){
    const pub = $event;
    this.setPublicacion(pub.userId, pub.id, pub.title, pub.body, pub.name);
    document.getElementById('topOfPage').scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  eliminarPublicacion($event){
    const pubId = $event.id;
    this.api.deletePublicacion(pubId).subscribe(
      (data) => {
        this.mostrarMensaje(`PUBLICACION ELIMINADA CORRECTAMENTE: ${pubId}...`);
        this.limpiarPublicacion();
        this.getPublicaciones();
      },
      (error) => this.mostrarError('NO FUE POSIBLE ELIMINAR LA PUBLICACION.', error)
    );
  }

  getIdentificadorItemPublicacion(index, item) {
    return item.id;
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async mostrarError(mensaje, error) {
    console.log(mensaje);
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
    throw error;
  }

  public salir(){

    this.authenticationService.cerrarSesion();
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
