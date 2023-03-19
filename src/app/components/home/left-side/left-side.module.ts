import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './left-side.component';

@NgModule({
  declarations: [LeftSideComponent],
  imports: [
    CommonModule
  ],
  exports: [LeftSideComponent]
})

export class LeftSideModule { }