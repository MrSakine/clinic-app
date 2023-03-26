import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { EndSheetComponent } from './end-sheet.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [EndSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports: [EndSheetComponent]
})

export class EndSheetModule { }