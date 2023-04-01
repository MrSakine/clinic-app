import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderDialogComponent } from './service-provider-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  exports: [ServiceProviderDialogComponent]
})

export class ServiceProviderDialogModule { }