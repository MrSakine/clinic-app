import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDialogComponent } from './service-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServiceDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ServiceDialogComponent]
})

export class ServiceDialogModule { }