import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})

export class CustomCurrencyPipe implements PipeTransform {
  CURRENCY = "FCFA";

  transform(value: number, ...args: unknown[]): unknown {
    let copy = String(value);
    let c = copy.slice(1);
    let n = null;

    for (let i = 0; i < copy.length; i++) {

    }

    return n;
  }

}
