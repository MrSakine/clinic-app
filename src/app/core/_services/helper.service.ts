import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RIGHT_SHEET_HELPERS } from '../_data/helpers';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor() { }

  getAll() {
    return of(RIGHT_SHEET_HELPERS);
  }
}
