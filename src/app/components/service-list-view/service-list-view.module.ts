import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListViewComponent } from './service-list-view.component';
import { ServiceListItemModule } from './service-list-item/service-list-item.module';

@NgModule({
  declarations: [ServiceListViewComponent],
  imports: [
    CommonModule,
    ServiceListItemModule,
  ],
  exports: [ServiceListViewComponent]
})

export class ServiceListViewModule { }