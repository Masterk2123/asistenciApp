import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrtmaloPageRoutingModule } from './prtmalo-routing.module';

import { PrtmaloPage } from './prtmalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrtmaloPageRoutingModule
  ],
  declarations: [PrtmaloPage]
})
export class PrtmaloPageModule {}
