import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { DatabaseService } from '../../core/_services/database.service';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  mode: MatDrawerMode = "over";
  hasBackDrop: boolean = true;
  services!: IPrestation[];
  serviceProviders!: IPrestataire[];
  insurances!: IAssurance[];
  cashiers!: ICashier[];
  change!: string;

  constructor(
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.setupData();
  }

  setupData() {
    this.databaseService.getDocument()
      .then(
        (val: IBase) => {
          this.services = val.services;
          this.serviceProviders = val.serviceProviders;
          this.insurances = val.insurances;
          this.cashiers = val.cashiers;
        }
      )
      .catch(err => console.error(err));
  }

  handleMenuClickEvent(event: any) {
    if (event) {
      this.drawer.toggle();
    }
  }

  handleRefreshEvent(e: any) {
    if (e) {
      this.setupData();
    }
  }

  makeChangeToRightSide() {
    let p = new Date().getTime();
    let sp = String(p);
    let sps = sp.slice(6);

    return sps;
  }

  handleLeftSideEvent(val: any) {
    if (val) {
      this.change = this.makeChangeToRightSide();
    }
  }
}