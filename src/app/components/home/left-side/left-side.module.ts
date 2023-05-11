import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './left-side.component';
import { PrimaryButtonModule } from '../../buttons/primary-button/primary-button.module';
import { SecondaryButtonModule } from '../../buttons/secondary-button/secondary-button.module';
import { SwitcherModule } from './switcher/switcher.module';
import { StartupStepModule } from './startup-step/startup-step.module';

@NgModule({
  declarations: [LeftSideComponent],
  imports: [
    CommonModule,
    PrimaryButtonModule,
    SecondaryButtonModule,
    SwitcherModule,
    StartupStepModule,
  ],
  exports: [LeftSideComponent]
})

export class LeftSideModule { }