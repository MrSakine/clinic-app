import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupStepComponent } from './startup-step.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StartupStepComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [StartupStepComponent]
})

export class StartupStepModule { }