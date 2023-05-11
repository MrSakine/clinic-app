import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPat } from '../_interfaces/ipat';
import { DatabaseService } from '../_services/database.service';
import { ITicket } from '../_interfaces/iticket';

@Injectable({
  providedIn: 'root'
})

export class SharePatDataSubscriptionService {
  private default_user: IPat = {
    fullname: '',
    address: '',
    phone_number: '',
    dob: 0
  };

  private source: BehaviorSubject<IPat> = new BehaviorSubject(this.default_user);
  private current: Observable<IPat> = this.source.asObservable();

  constructor(
    private databaseService: DatabaseService,
  ) {
  }

  init() {
    this.databaseService.getTicketDocument()
      .then(
        (val: ITicket) => {
          let pat = val.pat;
          this.default_user = {
            fullname: pat.fullname,
            address: pat.address,
            phone_number: pat.phone_number,
            dob: !pat.dob ? 0 : pat.dob,
          };

          this.source.next(this.default_user);
        }
      )
      .catch(err => console.error(err));
  }

  getCurrent() {
    setTimeout(() => { }, 100);
    return this.current;
  }

  changeCurrent(data: IPat) {
    this.source.next(data);
  }
}
