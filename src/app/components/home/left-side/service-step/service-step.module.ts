import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceStepComponent } from './service-step.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ChooseServiceDialogModule } from './choose-service-dialog/choose-service-dialog.module';

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
  ],
  exports: [ServiceStepComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ServiceStepModule { }