import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceStepComponent } from './insurance-step.component';

@NgModule({
  declarations: [InsuranceStepComponent],
  imports: [
    CommonModule
  ],
  exports: [InsuranceStepComponent]
})

export class InsuranceStepModule { }