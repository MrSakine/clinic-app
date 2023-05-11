import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { ServiceStepComponent } from './service-step.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ChooseServiceDialogModule } from './choose-service-dialog/choose-service-dialog.module';

registerLocaleData(localeFr);

@NgModule({
  declarations: [ServiceStepComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    ChooseServiceDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ServiceStepComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF',
    },
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    }
  ]
})

export class ServiceStepModule { }