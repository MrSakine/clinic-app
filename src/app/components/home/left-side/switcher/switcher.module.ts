import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitcherComponent } from './switcher.component';
import { ServiceStepModule } from '../service-step/service-step.module';
import { InsuranceStepModule } from '../insurance-step/insurance-step.module';
import { PersonStepModule } from '../person-step/person-step.module';
import { CashStepModule } from '../cash-step/cash-step.module';

@NgModule({
  declarations: [
    SwitcherComponent
  ],
  imports: [
    CommonModule,
    ServiceStepModule,
    InsuranceStepModule,
    PersonStepModule,
    CashStepModule,
  ],
  exports: [SwitcherComponent]
})

export class SwitcherModule { }