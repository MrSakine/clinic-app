import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceDialogComponent } from './insurance-dialog.component';

@NgModule({
  declarations: [InsuranceDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [InsuranceDialogComponent]
})

export class InsuranceDialogModule { }