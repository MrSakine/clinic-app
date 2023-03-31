import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoElementComponent } from './no-element.component';
import { PrimaryButtonModule } from '../buttons/primary-button/primary-button.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NoElementComponent],
  imports: [
    CommonModule,
    PrimaryButtonModule,
    MatIconModule,
  ],
  exports: [NoElementComponent]
})

export class NoElementModule { }