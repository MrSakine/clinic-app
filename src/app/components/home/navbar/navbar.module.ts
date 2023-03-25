import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { PrimaryButtonModule } from '../../buttons/primary-button/primary-button.module';
import { SecondaryButtonModule } from '../../buttons/secondary-button/secondary-button.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PrimaryButtonModule,
    SecondaryButtonModule,
    MatIconModule,
  ],
  exports: [NavbarComponent]
})

export class NavbarModule { }