import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { log } from '../model/Mensajes';
import { AuthenticationService } from './authetication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }
  
  async canActivate(): Promise<boolean | UrlTree> {
    
    log('LoginGuardService', 'Ejecutando guardián');
    
    const autenticado = await this.auth.isAuthenticated();

    log('LoginGuardService', autenticado? 'Usuario autenticado navegar a HomePage': 'Usuario no autenticado quedarse en LoginPage');
    
    return autenticado? this.router.parseUrl('/home'): true;

  }
}
