import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrtbuenaPageRoutingModule } from './prtbuena-routing.module';

import { PrtbuenaPage } from './prtbuena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrtbuenaPageRoutingModule
  ],
  declarations: [PrtbuenaPage]
})
export class PrtbuenaPageModule {}
