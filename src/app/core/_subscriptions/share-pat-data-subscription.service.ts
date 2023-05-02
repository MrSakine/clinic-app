import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPat } from '../_interfaces/ipat';

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

  constructor() { }

  getCurrent() {
    return this.current;
  }

  changeCurrent(data: IPat) {
    this.source.next(data);
  }
}
