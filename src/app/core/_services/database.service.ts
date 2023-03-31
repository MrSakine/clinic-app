import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBase } from '../_interfaces/ibase';
import { Observable } from 'rxjs';

const PATH = "/assets/data.json";

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor(private http: HttpClient) { }

  getData(): Observable<IBase> {
    return this.http.get<IBase>(PATH);
  }

  getOneData() { }

  create() { }

  update() { }

  delete() { }
}
