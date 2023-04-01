import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { EndSheetComponent } from './end-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { NoElementModule } from '../../no-element/no-element.module';
import { ServiceDialogModule } from './service-dialog/service-dialog.module';
import { ServiceProviderDialogModule } from './service-provider-dialog/service-provider-dialog.module';
import { InsuranceDialogModule } from './insurance-dialog/insurance-dialog.module';

@NgModule({
  declarations: [EndSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    NoElementModule,
    ServiceDialogModule,
    ServiceProviderDialogModule,
    InsuranceDialogModule,
  ],
  exports: [EndSheetComponent]
})

export class EndSheetModule { }