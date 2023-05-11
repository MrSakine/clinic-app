import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SUCCESS_MESSAGES } from '../_data/success-messages';

@Injectable({
  providedIn: 'root'
})

export class SuccessMessageService {

  constructor() { }

  getAll() {
    return of(SUCCESS_MESSAGES);
  }
}
