import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablecerContraPage } from './reestablecer-contra.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablecerContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablecerContraPageRoutingModule {}
