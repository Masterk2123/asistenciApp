import { AuthenticationService } from './authetication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { log } from '../model/Mensajes';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }
  
  async canActivate(): Promise<boolean | UrlTree>  {

    log('AuthGuardService', 'Ejecutando guardián');
    
    const autenticado = await this.auth.isAuthenticated();

    log('AuthGuardService', autenticado? 'Usuario autenticado quedarse en HomePage': 'Usuario no autenticado navegar a LoginPage');
    
    return autenticado? true: this.router.parseUrl('/login');
  }

}
