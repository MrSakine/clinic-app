import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RightSideComponent } from './right-side.component';
import { CustomCurrencyModule } from 'src/app/core/_pipes/custom-currency/custom-currency.module';
import { LoaderModule } from '../../loader/loader.module';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [RightSideComponent],
  imports: [
    CommonModule,
    CustomCurrencyModule,
    LoaderModule,
  ],
  exports: [RightSideComponent],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF',
    },
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    }
  ]
})

export class RightSideModule { }