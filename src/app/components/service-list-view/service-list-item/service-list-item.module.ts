import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListItemComponent } from './service-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

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
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF'
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ServiceListItemModule { }