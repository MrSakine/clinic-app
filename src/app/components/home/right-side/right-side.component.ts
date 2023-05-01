import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})

export class RightSideComponent implements OnInit, OnChanges {
  randomPatientID!: string;
  randomTicketID!: string;
  currentData!: ITicket;
  currentSSPs?: CustomSSP[];
  currentCashier?: ICashier;
  isCashier: boolean = false;

  @Input() services!: IPrestation[];
  @Input() change?: string;

  constructor(
    private databaseService: DatabaseService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupData();
  }

  ngOnInit(): void {
    this.generatePatientID();
    this.generateTicketID();
    this.setupData();
  }

  generatePatientID() {
    let p = new Date().getTime();
    let sp = String(p);
    let sps = sp.slice(6);

    this.randomPatientID = sps;
  }

  generateTicketID() {
    let p = moment().add(1, 'days').valueOf();
    let sp = String(p);
    let sps = sp.slice(6);

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
