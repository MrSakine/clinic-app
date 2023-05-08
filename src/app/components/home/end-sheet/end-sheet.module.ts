import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { EndSheetComponent } from './end-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { NoElementModule } from '../../no-element/no-element.module';
import { ServiceDialogModule } from './service-dialog/service-dialog.module';
import { ServiceProviderDialogModule } from './service-provider-dialog/service-provider-dialog.module';
import { InsuranceDialogModule } from './insurance-dialog/insurance-dialog.module';
import { ServiceListViewModule } from '../../service-list-view/service-list-view.module';
import { DeleteItemBottomSheetModule } from './delete-item-bottom-sheet/delete-item-bottom-sheet.module';
import { CashierDialogModule } from './cashier-dialog/cashier-dialog.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [EndSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatTooltipModule,
    NoElementModule,
    ServiceDialogModule,
    ServiceProviderDialogModule,
    InsuranceDialogModule,
    CashierDialogModule,
    ServiceListViewModule,
    DeleteItemBottomSheetModule,
  ],
  exports: [EndSheetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EndSheetModule { }