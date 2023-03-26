import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  mode: MatDrawerMode = "over";
  hasBackDrop: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  handleMenuClickEvent(event: any) {
    if (event) {
      this.drawer.toggle();
    }
  }
}