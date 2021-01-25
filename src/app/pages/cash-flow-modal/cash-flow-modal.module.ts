import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashFlowModalPageRoutingModule } from './cash-flow-modal-routing.module';

import { CashFlowModalPage } from './cash-flow-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashFlowModalPageRoutingModule
  ],
  declarations: [CashFlowModalPage]
})
export class CashFlowModalPageModule {}
