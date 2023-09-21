import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrtmaloPage } from './prtmalo.page';

const routes: Routes = [
  {
    path: '',
    component: PrtmaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrtmaloPageRoutingModule {}
