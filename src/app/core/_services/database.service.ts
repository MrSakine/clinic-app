import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBase } from '../_interfaces/ibase';
import { Observable, of } from 'rxjs';

import { IAssurance } from '../_interfaces/iassurance';
import { IPrestation } from '../_interfaces/iprestation';
import { IPrestataire } from '../_interfaces/iprestataire';

import PouchDB from 'pouchdb';

import { Service } from '../_classes/service';
import { ServiceProvider } from '../_classes/service-provider';
import { Insurance } from '../_classes/insurance';
import { Base } from '../_classes/base';
import { EndSheetLabel } from '../_enums/end-sheet-label';

const PATH = "/assets/data.json";

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  database!: PouchDB.Database<any>;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.database = new PouchDB("clinic-app");
    this.database.get("cla")
      .catch(() => {
        let doc = {
          "_id": "cla",
          "services": [],
          "serviceProviders": [],
          "insurances": []
        };

        this.database.put(doc);
      });
  }

  getData() {
    return this.database.allDocs();
  }

  getDocument(): Promise<any> {
    return this.database.get("cla");
  }

  create<T extends Base>(mode: string, value: T) {
    let table = this.getDocument();

    table
    .then(
      (val: IBase) => {
        let tmp = val;
        tmp._rev = val._rev;

        switch (mode) {
          case EndSheetLabel.SERVICE:
            break;
          default: break;
        }
      }
    )
    .catch(err => console.log(err));
  }

  update() { }

  delete() { }
}

