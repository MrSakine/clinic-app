import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSideComponent } from './right-side.component';

@NgModule({
  declarations: [RightSideComponent],
  imports: [
    CommonModule
  ],
  exports: [RightSideComponent]
})

export class RightSideModule { }