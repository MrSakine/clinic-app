import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ServiceListItemComponent } from './service-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [ServiceListItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
  ],
  exports: [ServiceListItemComponent],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF',
    },
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ServiceListItemModule { }