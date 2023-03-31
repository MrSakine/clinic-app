import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderDialogComponent } from './service-provider-dialog.component';

@NgModule({
  declarations: [ServiceProviderDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [ServiceProviderDialogComponent]
})

export class ServiceProviderDialogModule { }