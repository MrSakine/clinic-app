import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarModule } from './navbar/navbar.module';
import { LeftSideModule } from './left-side/left-side.module';
import { RightSideModule } from './right-side/right-side.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    LeftSideModule,
    RightSideModule,
  ],
  exports: [HomeComponent]
})

export class HomeModule { }