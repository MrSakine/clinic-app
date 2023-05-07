import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarModule } from './navbar/navbar.module';
import { LeftSideModule } from './left-side/left-side.module';
import { RightSideModule } from './right-side/right-side.module';
import { EndSheetModule } from './end-sheet/end-sheet.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxPrintModule } from 'ngx-print';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    NavbarModule,
    LeftSideModule,
    RightSideModule,
    EndSheetModule,
    NgxPrintModule,
    LoadingModule,
  ],
  exports: [HomeComponent]
})

export class HomeModule { }