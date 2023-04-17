import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonStepComponent } from './person-step.component';

@NgModule({
  declarations: [PersonStepComponent],
  imports: [
    CommonModule
  ],
  exports: [PersonStepComponent]
})

export class PersonStepModule { }