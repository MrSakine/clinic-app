import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteItemBottomSheetComponent } from './delete-item-bottom-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryButtonModule } from 'src/app/components/buttons/primary-button/primary-button.module';
import { SecondaryButtonModule } from 'src/app/components/buttons/secondary-button/secondary-button.module';

@NgModule({
  declarations: [DeleteItemBottomSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    PrimaryButtonModule,
    SecondaryButtonModule,
  ],
  exports: [DeleteItemBottomSheetComponent]
})

export class DeleteItemBottomSheetModule { }