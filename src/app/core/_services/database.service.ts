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
              let obj: Service = value as unknown as Service;
              tmp.services.push({ type: obj.type, price: obj.price });

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER:
              let obj1: ServiceProvider = value as unknown as ServiceProvider;
              tmp.serviceProviders.push({ name: obj1.firstname, surname: obj1.lastname, service: obj1.service });

              this.database.put(tmp);
              break;
            case EndSheetLabel.INSURANCE: break;
            default: break;
          }
        }
      )
      .catch(err => console.log(err));
  }

  update<T extends Base>(mode: string, value: T) {
    let table = this.getDocument();

    table
      .then(
        (val: IBase) => {
          let tmp = val;
          tmp._rev = val._rev;

          switch (mode) {
            case EndSheetLabel.SERVICE:
              let obj: Service = value as unknown as Service;
              let foundItem = tmp.services.findIndex(v => v.type === obj.type);
              tmp.services[foundItem] = obj;

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER: break;
            case EndSheetLabel.INSURANCE: break;
            default: break;
          }
        }
      )
      .catch(err => console.error(err));
  }

  delete<T extends Base>(mode: string, value: T) {
    let table = this.getDocument();

    table
      .then(
        (val: IBase) => {
          let tmp = val;
          tmp._rev = val._rev;

          switch (mode) {
            case EndSheetLabel.SERVICE:
              let obj: Service = value as unknown as Service;
              let el = tmp.services.filter(v => v.type !== obj.type);
              tmp.services = el;

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER: break;
            case EndSheetLabel.INSURANCE: break;
            default: break;
          }
        }
      )
      .catch(err => console.error(err));
  }
}

