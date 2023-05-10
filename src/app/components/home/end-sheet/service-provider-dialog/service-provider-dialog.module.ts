import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderDialogComponent } from './service-provider-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ServiceProviderDialogComponent],
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
    MatTooltipModule,
  ],
  exports: [ServiceProviderDialogComponent]
})

export class ServiceProviderDialogModule { }