import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStepComponent } from './service-step.component';

@NgModule({
  declarations: [ServiceStepComponent],
  imports: [
    CommonModule
  ],
  exports: [ServiceStepComponent]
})

export class ServiceStepModule { }