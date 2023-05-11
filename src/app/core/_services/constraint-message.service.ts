import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CONSTRAINT_MESSAGES } from '../_data/constraint-messages';

@Injectable({
  providedIn: 'root'
})

export class ConstraintMessageService {

  constructor() { }

  getAll() {
    return of(CONSTRAINT_MESSAGES);
  }
}
