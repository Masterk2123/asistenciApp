import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrtbuenaPage } from './prtbuena.page';

const routes: Routes = [
  {
    path: '',
    component: PrtbuenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrtbuenaPageRoutingModule {}
