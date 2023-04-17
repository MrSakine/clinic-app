import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierDialogComponent } from './cashier-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CashierDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    LoaderModule,
  ],
  exports: [CashierDialogComponent]
})

export class CashierDialogModule { }