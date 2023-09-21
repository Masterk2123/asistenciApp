import { ComentariosPostsComponent } from './comentarios-posts/comentarios-posts.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';
import { InicioComponent } from './inicio/inicio.component';
import { MiClaseComponent } from './mi-clase/mi-clase.component';



@NgModule({
  declarations: [
    //aqui declaramos todos los componentes
    InicioComponent,
    MiClaseComponent,
    ComentariosPostsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    //aqui exportamos todos los componentes
    InicioComponent,
    MiClaseComponent,
    ComentariosPostsComponent,
    FormsModule
  ]
})
export class ComponentsModule { }