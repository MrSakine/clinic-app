import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { DatabaseService } from '../../core/_services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  mode: MatDrawerMode = "over";
  hasBackDrop: boolean = true;

  constructor(
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.databaseService.getData();
  }

  handleMenuClickEvent(event: any) {
    if (event) {
      this.drawer.toggle();
    }
  }
}