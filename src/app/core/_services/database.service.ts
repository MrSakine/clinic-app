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
import { Cashier } from '../_classes/cashier';
import { ICashier } from '../_interfaces/icashier';

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
          "insurances": [],
          "cashiers": []
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
    let id = 1;

    table
      .then(
        (val: IBase) => {
          let tmp = val;
          tmp._rev = val._rev;

          switch (mode) {
            case EndSheetLabel.SERVICE:
              let obj: Service = value as unknown as Service;
              id = this.getID(id, tmp.services);
              tmp.services.push({ id: id, type: obj.type, price: obj.price });

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER:
              let obj1: ServiceProvider = value as unknown as ServiceProvider;
              id = this.getID(id, tmp.serviceProviders);
              tmp.serviceProviders.push({ id: id, name: obj1.lastname, surname: obj1.firstname, service: obj1.service });

              this.database.put(tmp);
              break;
            case EndSheetLabel.INSURANCE:
              let obj2: Insurance = value as unknown as Insurance;
              id = this.getID(id, tmp.insurances);
              tmp.insurances.push({ id: id, name: obj2.name, percentage: obj2.percentage });

              this.database.put(tmp);
              break;
            case EndSheetLabel.CASHIER:
              let obj3: Cashier = value as unknown as Cashier;
              id = this.getID(id, tmp.cashiers);
              tmp.cashiers.push(obj3);

              this.database.put(tmp);
              break;
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
              let foundItem = tmp.services.findIndex(v => v.id === obj.id);
              tmp.services[foundItem] = obj;

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER:
              let obj1: ServiceProvider = value as unknown as ServiceProvider;
              let foundItem1 = tmp.serviceProviders.findIndex(v => v.id === obj1.id);
              tmp.serviceProviders[foundItem1] = { id: obj1.id, name: obj1.lastname, surname: obj1.firstname, service: obj1.service };

              this.database.put(tmp);
              break;
            case EndSheetLabel.INSURANCE:
              let obj2: Insurance = value as unknown as Insurance;
              let foundItem2 = tmp.insurances.findIndex(v => v.id === obj2.id);
              tmp.insurances[foundItem2] = { id: obj2.id, name: obj2.name, percentage: obj2.percentage };

              this.database.put(tmp);
              break;
            case EndSheetLabel.CASHIER:
              let obj3 : Cashier = value as unknown as Cashier;
              let foundItem3 = tmp.cashiers.findIndex(v => v.id === obj3.id);
              tmp.cashiers[foundItem3] = obj3;

              this.database.put(tmp);
              break;
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
              let el = tmp.services.filter(v => v.id !== obj.id);
              tmp.services = el;

              this.database.put(tmp);
              break;
            case EndSheetLabel.SERVICE_PROVIDER:
              let ob1: ServiceProvider = value as unknown as ServiceProvider;
              let el1 = tmp.serviceProviders.filter(v => v.id !== ob1.id);
              tmp.serviceProviders = el1;

              this.database.put(tmp);
              break;
            case EndSheetLabel.INSURANCE:
              let ob2: Insurance = value as unknown as Insurance;
              let el2 = tmp.insurances.filter(v => v.id !== ob2.id);
              tmp.insurances = el2;

              this.database.put(tmp);
              break;
            case EndSheetLabel.CASHIER:
              let ob3: Cashier = value as unknown as Cashier;
              let el3 = tmp.cashiers.filter(v => v.id !== ob3.id);
              tmp.cashiers = el3;

              this.database.put(tmp);
              break;
            default: break;
          }
        }
      )
      .catch(err => console.error(err));
  }

  getID(start: number, arr: any[]) {
    let id = start;

    if (arr.length > 0) {
      let lastEl = arr[arr.length - 1];
      id += lastEl.id;
    }

    return id;
  }
}

