import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { DatabaseService } from '../../core/_services/database.service';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { IPat } from 'src/app/core/_interfaces/ipat';
import { Subscription } from 'rxjs';
import { SharePatDataSubscriptionService } from 'src/app/core/_subscriptions/share-pat-data-subscription.service';
import { ShareCashDataSubscriptionService } from 'src/app/core/_subscriptions/share-cash-data-subscription.service';
import moment from 'moment';
import { ITicket } from 'src/app/core/_interfaces/iticket';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  mode: MatDrawerMode = "over";
  hasBackDrop: boolean = true;
  showLoading: boolean = false;
  services!: IPrestation[];
  serviceProviders!: IPrestataire[];
  insurances!: IAssurance[];
  cashiers!: ICashier[];
  change!: string;
  personChange!: IPat;
  cashStepChange!: string;
  userDataSubscription!: Subscription;
  shareCashSubscription!: Subscription;
  ticketExist: boolean = false;
  canDeleteTicket: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private sharePatSubscriptionService: SharePatDataSubscriptionService,
    private shareCashSubscriptionService: ShareCashDataSubscriptionService,
  ) { }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.shareCashSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setupData();

    setTimeout(() => {
      this.sharePatSubscriptionService.init();
      this.shareCashSubscriptionService.init();

      this.shareCashSubscription = this.shareCashSubscriptionService.getCurrent().subscribe(() => { });
    }, 100);
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

  makeChangeToRightSide(day: number) {
    let p = moment().add(day, 'days').valueOf();
    let sp = String(p);
    let sps = sp.slice(6);

    return sps;
  }

  handleLeftSideEvent(val: any) {
    if (val) {
      this.change = this.makeChangeToRightSide(10);
    }
  }

  onSwitcherPersonStepEmitter(val: IPat) {
    this.personChange = val;
  }

  onSwitcherCashStepEmitter(val: any) {
    if (val) {
      setTimeout(() => {
        this.cashStepChange = this.makeChangeToRightSide(20);
        this.showLoading = true;
      }, 100);
    }
  }

  handleHideLoading(val: any) {
    if (val) {
      this.showLoading = !val;
    }
  }

  checkTicketExistence() {
    this.databaseService.getTicketDocument()
      .then(
        (doc: ITicket) => {
          if (doc.ssp.data.length > 0) {
            this.ticketExist = true;
            let s = confirm("Vous avez déjà un ticket en cours, voulez-vous continuer ?");

            if (!s) {
              this.canDeleteTicket = true;
            } else {
              this.canDeleteTicket = false;
            }
          } else {
            this.ticketExist = false;
          }
        }
      )
      .catch();
  }

  deleteDocument() {
    setTimeout(() => {
      if (this.ticketExist && this.canDeleteTicket) {
        this.databaseService.deleteDocument("ticket");
      }
    }, 100);
  }

  fetchData() {
    this.setupData();

    setTimeout(() => {
      this.sharePatSubscriptionService.init();
      this.shareCashSubscriptionService.init();

      this.shareCashSubscription = this.shareCashSubscriptionService.getCurrent().subscribe(() => { });
    }, 100);
  }
}