import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashStepComponent } from './cash-step.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CashStepComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CashStepComponent],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF',
    }
  ]
})

export class CashStepModule { }