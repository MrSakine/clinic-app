import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './left-side.component';
import { PrimaryButtonModule } from '../../buttons/primary-button/primary-button.module';
import { SecondaryButtonModule } from '../../buttons/secondary-button/secondary-button.module';

@NgModule({
  declarations: [LeftSideComponent],
  imports: [
    CommonModule,
    PrimaryButtonModule,
    SecondaryButtonModule,
  ],
  exports: [LeftSideComponent]
})

export class LeftSideModule { }