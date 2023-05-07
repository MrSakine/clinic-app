import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSideComponent } from './right-side.component';
import { CustomCurrencyModule } from 'src/app/core/_pipes/custom-currency/custom-currency.module';
import { NgxPrintModule } from 'ngx-print';
import { LoaderModule } from '../../loader/loader.module';

@NgModule({
  declarations: [RightSideComponent],
  imports: [
    CommonModule,
    CustomCurrencyModule,
    NgxPrintModule,
    LoaderModule,
  ],
  exports: [RightSideComponent],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF',
    }
  ]
})

export class RightSideModule { }