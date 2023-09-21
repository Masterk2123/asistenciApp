import { AuthGuardService } from './services/auth-guard.guard';
import { LoginGuardService } from './services/login-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    //canActivate: [LoginGuardService] 
  },
  {
    path: 'pregunta-secreta',
    loadChildren: () => import('./pregunta-secreta/pregunta-secreta.module').then( m => m.PreguntaSecretaPageModule)
  },
  {
    path: 'reestablecer-contra',
    loadChildren: () => import('./reestablecer-contra/reestablecer-contra.module').then( m => m.ReestablecerContraPageModule)
  },
  {
    path: 'prtbuena',
    loadChildren: () => import('./prtbuena/prtbuena.module').then( m => m.PrtbuenaPageModule)
  },
  {
    path: 'prtmalo',
    loadChildren: () => import('./prtmalo/prtmalo.module').then( m => m.PrtmaloPageModule)
  },
  {
    path: 'eliminar-usuarios',
    loadChildren: () => import('./eliminar-usuarios/eliminar-usuarios.module').then( m => m.EliminarUsuariosPageModule)
  },
  {
    path: 'crear-usuarios',
    loadChildren: () => import('./crear-usuarios/crear-usuarios.module').then( m => m.CrearUsuariosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
