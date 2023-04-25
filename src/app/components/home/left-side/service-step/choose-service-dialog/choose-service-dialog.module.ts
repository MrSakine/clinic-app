import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseServiceDialogComponent } from './choose-service-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ChooseServiceDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [ChooseServiceDialogComponent]
})

export class ChooseServiceDialogModule { }