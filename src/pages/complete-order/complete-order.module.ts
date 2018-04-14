import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteOrderPage } from './complete-order';

@NgModule({
  declarations: [
    CompleteOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteOrderPage),
  ],
})
export class CompleteOrderPageModule {}
