import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ICash } from 'src/app/core/_interfaces/icash';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IIns } from 'src/app/core/_interfaces/iins';
import { IPat } from 'src/app/core/_interfaces/ipat';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ISsp } from 'src/app/core/_interfaces/issp';
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
  currentInsurance?: IAssurance;
  isCashier: boolean = false;
  currentPat!: IPat;
  currentCash!: ICash;

  @Input() services!: IPrestation[];
  @Input() change?: string;
  @Input() personChange?: IPat;

  userDataSubscription!: Subscription;
  insurance_amount_text!: string;
  default_insurance_amount_text: string = 'Montant assurance';
  var_insurance_amount_text: string = 'Montant %s';
  insurance_amount_due_text!: string;
  var_insurance_amount_due_text: string = 'Rester à payer par le tiers payant (%s / %s %)';
  default_insurance_amount_due_text: string = 'Rester à payer par le tiers payant';

  constructor(
    private databaseService: DatabaseService,
    private sharePatSubscriptionService: SharePatDataSubscriptionService,
  ) {
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['change'] || changes['personChange']) {
      this.setupData();
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
          this.currentCash = this.currentData.cash;
          this.currentSSPs = this.getServiceAndServiceProviders(this.currentData.ssp.data);
          this.currentCashier = this.currentData.ssp.cashier;
          if (this.currentCashier) {
            this.isCashier = Object.keys(this.currentCashier).length > 0 ? true : false;
          }

          this.currentInsurance = this.currentData.ins?.insurance[0];
          this.setupInsuranceAmount(this.currentData.ssp, this.currentInsurance);
          this.calculateAmount();
        }
      )
      .catch(err => console.error(err));
  }

  setupInsuranceAmount(s: ISsp, i: IAssurance | undefined) {
    if (s.hasInsurance) {
      this.insurance_amount_text = this.var_insurance_amount_text.replace('%s', String(i?.name));
      this.insurance_amount_due_text = this.var_insurance_amount_due_text
        .replace('%s', String(i?.name)).replace('%s', String(i?.percentage));
    } else {
      this.insurance_amount_text = this.default_insurance_amount_text;
      this.insurance_amount_due_text = this.default_insurance_amount_due_text;
    }
  }

  setupPatData() {
    this.userDataSubscription = this.sharePatSubscriptionService.getCurrent()
      .subscribe(
        val => {
          this.currentPat = val;
        }
      );
  }

  calculateAmount() {
    let i = 0;
    let j = 0;

    this.currentSSPs?.forEach(s => i += s.service.price);
    this.currentCash.total = i;
    this.currentCash.insurance_amount = 0;
    this.currentCash.insurance_due = 0;
    this.currentCash.patient_due = 0;
    this.currentCash.amount_due = 0;
    this.currentCash.amount_received = 0;
    this.currentCash.amount_to_refund = 0;

    if (this.currentInsurance !== undefined && this.currentData.ssp.hasInsurance) {
      let x = Number(this.currentInsurance.percentage);
      let y = x / 100;
      let z = this.currentCash.total * y;
      j = this.currentCash.total - z;

      this.currentCash.insurance_due = j;
      this.currentCash.patient_due = this.currentCash.total - j;
    } else {
      this.currentCash.insurance_due = 0;
      this.currentCash.patient_due = this.currentCash.total;
    }
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
