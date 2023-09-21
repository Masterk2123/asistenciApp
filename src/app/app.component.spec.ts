import { SQLiteService } from './services/sqlite.service';
import { RouteReuseStrategy } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Usuario } from './model/Usuario';

import { AppComponent } from './app.component';

describe('Probar el comienzo de la aplicación', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [
        DatabaseService, 
        AuthenticationService,
        SQLiteService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
      ],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título de la aplicación sea "Asistencia Duoc"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    alert(app.title);
    expect(app.title).toEqual('Asistencia Duoc');
  });

});


describe('Probar clase de usuario', () => {

  //Correo
  describe ('Probar que el correo sea correcto', () => {
    const usuario = new Usuario();
    usuario.correo = 'atorres@duocuc.cl';
    usuario.password = 'abc123';
    usuario.nombre = 'Ana Torres Leiva';
    usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
    usuario.respuestaSecreta = 'gato';

    it ('Probar que el correo no sea vacío', () => {
      usuario.correo = '';
      expect(usuario.validateEmail(usuario.correo)).toContain('ingresar el correo');
    });

    it('Probar que el correo contenga @', ()=> {
      usuario.correo = 'asdfasdfd.com';
      expect(usuario.validateEmail(usuario.correo)).toContain('correo valido');
    });

    it ('Probar que el correo sea correcto', () => {
      usuario.nombre = 'hola@gmail.com';
      expect(usuario.validateEmail(usuario.correo)).toEqual('');
    });

  });
  //Contraseña
  describe ('Probar que la contraseña sea correcta', () => {
    const usuario = new Usuario();
    usuario.correo = 'atorres@duocuc.cl';
    usuario.password = 'abc123';
    usuario.nombre = 'Ana Torres Leiva';
    usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
    usuario.respuestaSecreta = 'gato';

    it ('Probar que la contraseña no sea vacío', () => {
      usuario.password = '';
      expect(usuario.validatePassword(usuario.password)).toContain('ingresar la contraseña');
    });

    it ('Probar que la contraseña sea de 6 dígitos como máximo', () => {
      usuario.password = '1234567890';
      expect(usuario.validatePassword(usuario.password)).toContain('debe ser de 6 dígitos');
    });

    it ('Probar que la contraseña sea correcta', () => {
      usuario.password = 'abcd';
      expect(usuario.validatePassword(usuario.password)).toEqual('');
    });

  });
  //Nombre
  describe ('Probar que el nombre sea correcto', () => {
    const usuario = new Usuario();
    usuario.correo = 'atorres@duocuc.cl';
    usuario.password = 'abc123';
    usuario.nombre = 'Ana Torres Leiva';
    usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
    usuario.respuestaSecreta = 'gato';

    it ('Probar que el nombre no sea vacío', () => {
      usuario.nombre = '';
      expect(usuario.validateName(usuario.nombre)).toContain('ingresar su nombre');
    });

    it ('Probar que el nombre sea correcto', () => {
      usuario.nombre = 'juan';
      expect(usuario.validateName(usuario.nombre)).toEqual('');
    });

  }); 
  //Pregunta Secreta
  describe ('Probar que la pregunta secreta sea correcta', () => {
    const usuario = new Usuario();
    usuario.correo = 'atorres@duocuc.cl';
    usuario.password = 'abc123';
    usuario.nombre = 'Ana Torres Leiva';
    usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
    usuario.respuestaSecreta = 'gato';

    it ('Probar que la pregunta secreta no sea vacío', () => {
      usuario.preguntaSecreta = '';
      expect(usuario.validateSecretQuestion(usuario.preguntaSecreta)).toContain('ingresar su pregunta secreta');
    });

    it ('Probar que la pregunta secreta contenga signos de interrogación "¿?" ', () => {
      usuario.preguntaSecreta = 'animal favorito';
      expect(usuario.validateSecretQuestion(usuario.preguntaSecreta)).toContain('ingresada con los signos de pregunta');
    });
    
    it ('Probar que la pregunta secreta sea correcto', () => {
      usuario.preguntaSecreta = '¿Animal Favorito?';
      expect(usuario.validateSecretQuestion(usuario.preguntaSecreta)).toEqual('');
    });

  }); 
  //Respuesta Secreta
  describe ('Probar que la respuesta secreta sea correcta', () => {
    const usuario = new Usuario();
    usuario.correo = 'atorres@duocuc.cl';
    usuario.password = 'abc123';
    usuario.nombre = 'Ana Torres Leiva';
    usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
    usuario.respuestaSecreta = 'gato';

    it ('Probar que la respuesta secreta no sea vacío', () => {
      usuario.respuestaSecreta = '';
      expect(usuario.validateSecretAnswer(usuario.respuestaSecreta)).toContain('ingresar su respuesta secreta');
    });
    
    it ('Probar que la respuesta secreta sea correcta', () => {
      usuario.respuestaSecreta = 'Gato';
      expect(usuario.validateSecretAnswer(usuario.respuestaSecreta)).toEqual('');
    });

  }); 

});
