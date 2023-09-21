import { log } from 'src/app/model/Mensajes';
import { DBSQLiteValues } from "@capacitor-community/sqlite";

export class Usuario {
    public correo = '';
    public password = '';
    public nombre = '';
    public preguntaSecreta = '';
    public respuestaSecreta = '';
    public sesionActiva = '';

    constructor() { }
  //Setear user normal con los 6 campos estandar
    setUser(correo: string,
        password: string,
        nombre: string,
        preguntaSecreta: string,
        respuestaSecreta: string,
        sesionActiva: string)
    {
        this.correo = correo;
        this.password = password;
        this.nombre = nombre;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
        this.sesionActiva = sesionActiva;
    }

    //Setear user Con Seguridad (Pide el Hide Secrets)
    setUserCS(correo: string,
      password: string,
      nombre: string,
      preguntaSecreta: string,
      respuestaSecreta: string,
      sesionActiva: string,
      hideSecrets: boolean)
  {
      this.correo = correo;
      this.nombre = nombre;
      this.sesionActiva = sesionActiva;
      if (hideSecrets) {
        this.password = '';
        this.preguntaSecreta = '';
        this.respuestaSecreta = '';
      
      } else {
        this.password = password;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
      }
  }

    setPreguntaSecreta(correo: string, preguntaSecreta: string){
      this.correo = correo;
      this.preguntaSecreta = preguntaSecreta;
    }

    validateEmail(correo: string): string {
      if (correo.trim() === '') {
        return 'Para ingresar al sistema debe ingresar el correo del usuario.';
      } 
      if(!correo.includes("@")){
        return 'Debe ingresar un correo valido que contenga el signo "@".'
      }
      return '';
    }

    validateName(nombre: string): string {
      if (nombre.trim() === '') return 'Debe ingresar su nombre.';
      return '';
    }
  
    validatePassword(password: string): string {
      if (password.trim() === ''){ 
        return 'Para entrar al sistema debe ingresar la contraseña.';
      }
      if (this.password.length >= 6) {
        return 'La contraseña debe ser de 6 dígitos como máximo.';
      }
      return '';
    }

    validateSecretQuestion(preguntaSecreta: string): string {
      if (preguntaSecreta.trim() === '') {
        return 'Debe ingresar su pregunta secreta.';
      }
      if(!preguntaSecreta.includes('¿') || !preguntaSecreta.includes('?')){
        return 'La pregunta secreta debe ser ingresada con los signos de pregunta correspondiente "¿?" '
      }

      return '';
    }

    validateSecretAnswer(answer: string): string {
      if (answer.trim() === '') return 'Debe ingresar su respuesta secreta.';
      return '';
    }

    validateUser(correo: string, password: string): string {
        return this.validateEmail(correo) || this.validatePassword(password);
    }

    validateUserFields(correo: string, password: string, name: string
      , secretQuestion: string, secretAnswer: string): string {
        return this.validateEmail(correo) 
        || this.validatePassword(password)
        || this.validateName(name)
        || this.validateSecretQuestion(secretQuestion)
        || this.validateSecretAnswer(secretAnswer);
    }
    

    imprimirUsuario(): void{
      log('Usuario: ', this.correo + ' ' + this.password + ' ' + this.nombre + ' ' + this.preguntaSecreta + ' ' + this.respuestaSecreta + ' ' + this.sesionActiva);
    }
  }
  