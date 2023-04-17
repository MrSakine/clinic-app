import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashStepComponent } from './cash-step.component';

@NgModule({
  declarations: [CashStepComponent],
  imports: [
    CommonModule
  ],
  exports: [CashStepComponent]
})

export class CashStepModule { }