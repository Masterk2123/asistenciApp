import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authetication.service';
import { DatabaseService } from './services/database.service';
import { log } from './model/Mensajes';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Asistencia Duoc';
  PError = false;
  constructor(
    private platform: Platform,
    private databaseService: DatabaseService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  getErrorMessage(method: string, msg: string): string {
    return `AppComponent error, Method ${method}. ${msg}`;
  }

  alertError(method: string, msg: string) {
    const message = this.getErrorMessage(method, msg);
    console.log(message);
    alert(message);
  }

  initializeApp() {
    log('StartApp', 'Iniciando aplicación');

    this.platform.ready().then(async () => {

      log('StartApp', 'Plataforma lista');
      this.databaseService.StartDatabaseService().then(isReady => {
        console.log('METHOD initializeApp.initializeDatabase ' + isReady);
      });
      this.authenticationService.initializeAuthentication().then(isReady => {
        console.log('METHOD initializeApp.initializeAuthentication ' + isReady);
      });

    });
  }
}
