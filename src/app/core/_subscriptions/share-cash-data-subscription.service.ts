import { Injectable } from '@angular/core';
import { ICash } from '../_interfaces/icash';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from '../_services/database.service';
import { ITicket } from '../_interfaces/iticket';

@Injectable({
  providedIn: 'root'
})

export class ShareCashDataSubscriptionService {
  private default_cash: ICash = {
    total: 0,
    insurance_amount: 0,
    insurance_due: 0,
    patient_due: 0,
    amount_received: 0,
    amount_due: 0,
    amount_to_refund: 0
  };

  private source: BehaviorSubject<ICash> = new BehaviorSubject(this.default_cash);
  private current: Observable<ICash> = this.source.asObservable();

  constructor(
    private databaseService: DatabaseService,
  ) { }

  init() {
    this.databaseService.getTicketDocument()
      .then(
        (val: ITicket) => {
          this.default_cash = val.cash;
          this.source.next(this.default_cash);
        }
      )
      .catch(err => console.error(err));
  }

  getCurrent() {
    return this.current;
  }

  changeCurrent(data: ICash) {
    this.source.next(data);
  }
}
