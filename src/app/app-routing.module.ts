import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'print', loadChildren: () => import('./components/printer/printer.module').then(m => m.PrinterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }