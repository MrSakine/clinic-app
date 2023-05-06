import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPat } from 'src/app/core/_interfaces/ipat';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';
import { SharePatDataSubscriptionService } from 'src/app/core/_subscriptions/share-pat-data-subscription.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})

export class RightSideComponent implements OnInit, OnChanges, OnDestroy {
  randomPatientID!: string;
  randomTicketID!: string;
  currentData!: ITicket;
  currentSSPs?: CustomSSP[];
  currentCashier?: ICashier;
  isCashier: boolean = false;
  currentPat!: IPat;

  @Input() services!: IPrestation[];
  @Input() change?: string;
  @Input() personChange?: IPat;

  userDataSubscription!: Subscription;
  insurance_amount_text: string = 'Montant assurance';
  insurance_amount_due_text: string = 'Rester à payer par le tiers payant';

  constructor(
    private databaseService: DatabaseService,
    private sharePatSubscriptionService: SharePatDataSubscriptionService,
  ) {
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['change'] && changes['change'].previousValue !== undefined) {
      this.setupData();
    } else {
      if (changes['personChange'] && changes['personChange'].previousValue !== undefined) {
        this.setupPatData();
      }
    }
  }

  ngOnInit(): void {
    this.generatePatientID();
    this.generateTicketID();
    this.setupData();
    this.setupPatData();
  }

  generatePatientID() {
    let p = new Date().getTime();
    let sp = String(p);
    let sps = sp.slice(7);

    this.randomPatientID = sps;
  }

  generateTicketID() {
    let p = moment().add(1, 'months').valueOf();
    let sp = String(p);
    let sps = sp.slice(7);

    this.randomTicketID = sps;
  }

  setupData() {
    let table = this.databaseService.getTicketDocument();
    table
      .then(
        (val: ITicket) => {
          this.currentData = val;
          this.currentSSPs = this.getServiceAndServiceProviders(this.currentData.ssp.data);
          this.currentCashier = this.currentData.ssp.cashier;
          if (this.currentCashier) {
            this.isCashier = Object.keys(this.currentCashier).length > 0 ? true : false;
          }
        }
      )
      .catch(err => console.error(err));
  }

  setupPatData() {
    this.userDataSubscription = this.sharePatSubscriptionService.getCurrent()
      .subscribe(
        val => {
          this.currentPat = val;
        }
      );
  }

  getServiceAndServiceProviders(data: Array<Record<string, IPrestataire>>) {
    let tmp: CustomSSP[] = [];
    let i = 1;

    if (data) {
      data.forEach(d => {
        Object.keys(d).forEach((key: string) => {
          let a = this.services.find(v => String(v.id) === key);

          if (a) {
            tmp.push({ id: i, service: a, serviceProvider: d[key] });
          }

          i += 1;
        });
      });
    }

    return tmp;
  }

}
