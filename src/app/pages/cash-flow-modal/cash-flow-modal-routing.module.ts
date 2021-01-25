import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashFlowModalPage } from './cash-flow-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CashFlowModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowModalPageRoutingModule {}
