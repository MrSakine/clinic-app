import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [
    CommonModule
  ],
  exports: [CustomCurrencyPipe]
})

export class CustomCurrencyModule { }