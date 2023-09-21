import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReestablecerContraPageRoutingModule } from './reestablecer-contra-routing.module';

import { ReestablecerContraPage } from './reestablecer-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablecerContraPageRoutingModule
  ],
  declarations: [ReestablecerContraPage]
})
export class ReestablecerContraPageModule {}
