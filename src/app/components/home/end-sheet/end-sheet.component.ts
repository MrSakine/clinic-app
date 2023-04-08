import { Component, OnInit, Type } from '@angular/core';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { IAssurance } from '../../../core/_interfaces/iassurance';
import { NoElementEvent } from 'src/app/core/_events/no-element-event';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { ServiceProviderDialogComponent } from './service-provider-dialog/service-provider-dialog.component';
import { InsuranceDialogComponent } from './insurance-dialog/insurance-dialog.component';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { DatabaseService } from 'src/app/core/_services/database.service';
import { HelperService } from 'src/app/core/_services/helper.service';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { HelperIcon } from 'src/app/core/_enums/helper-icon';
import { ServiceDialogData } from 'src/app/core/_dialog-data/service-dialog-data';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { ServiceProviderDialogData } from 'src/app/core/_dialog-data/service-provider-dialog-data';
import { InsuranceDialogData } from 'src/app/core/_dialog-data/insurance-dialog-data';
import { EndSheetLabelAction } from 'src/app/core/_enums/end-sheet-label-action';

interface Help {
  icon: string;
  title: string;
  content: string;
  button: string;
}

@Component({
  selector: 'app-end-sheet',
  templateUrl: './end-sheet.component.html',
  styleUrls: ['./end-sheet.component.scss']
})

export class EndSheetComponent implements OnInit {
  helpers: Observable<Help[]> = this.helperService.getAll();
  prestationHelp!: Help;
  prestataireHelp!: Help;
  insuranceHelp!: Help;

  ref!: MatDialogRef<ServiceDialogComponent | ServiceProviderDialogComponent | InsuranceDialogComponent>;
  services!: IPrestation[];
  serviceProviders!: IPrestataire[];
  insurances!: IAssurance[];

  constructor(
    private helperService: HelperService,
    private matDialog: MatDialog,
    private databaseService: DatabaseService,
  ) {
    this.helpers.subscribe(
      val => {
        this.prestationHelp = val.find(v => v.icon === HelperIcon.SERVICE) as Help;
        this.prestataireHelp = val.find(v => v.icon === HelperIcon.SERVICE_PROVIDER) as Help;
        this.insuranceHelp = val.find(v => v.icon === HelperIcon.INSURANCE) as Help;
      }
    );
  }

  onNoElementComponentAddClickEvent(event: NoElementEvent) {
    let action = event.action;
    let label = event.label;
    let whichLabel = this.findLabelByName(label);

    switch (whichLabel) {
      case 0x1:
        this.openServiceDialog(null, whichLabel, action);
        break;
      case 0x2:
        this.openServiceProviderDialog(null, whichLabel, action);
        break;
      case 0x3:
        this.openInsuranceDialog(null, whichLabel, action);
        break;
      default: break;
    }
  }

  ngOnInit(): void {
    this.setupData();
  }

  setupData(): void {
    this.databaseService.getDocument()
      .then((doc: IBase) => {
        this.services = doc.services;
        this.serviceProviders = doc.serviceProviders;
        this.insurances = doc.insurances;
      })
      .catch(err => console.error(err));
  }

  openServiceDialog(service: IPrestation | null | undefined, mode: number, action: string) {
    let data = this.prepareDialogData("30%", null, mode, action);
    this.ref = this.matDialog.open(ServiceDialogComponent, data);
  }

  openServiceProviderDialog(serviceProvider: IPrestataire | null | undefined, mode: number, action: string) {
    let data = this.prepareDialogData("30%", null, mode, action);
    this.ref = this.matDialog.open(ServiceProviderDialogComponent, data);
  }

  openInsuranceDialog(insurance: IAssurance | null | undefined, mode: number, action: string) {
    let data = this.prepareDialogData("30%", null, mode, action);
    this.ref = this.matDialog.open(InsuranceDialogComponent, data);
  }

  prepareDialogData(width: string, obj: IPrestation | IAssurance | null | undefined, mode: number, action: string): MatDialogConfig {
    let config = new MatDialogConfig();
    let elementRef = document.getElementById('app-right-sheet');
    let rect = elementRef?.getBoundingClientRect();
    config.width = width;
    config.position = {
      top: String(Number(rect?.top) + 150) + 'px',
      left: String(Number(rect?.left) + 120) + 'px',
      right: String(rect?.right) + 'px',
    };

    const MODES = ["add", "edit", "delete"];
    let o = null;

    switch (mode) {
      case 0x1:
        o = this.getInstance(ServiceDialogData);
        break;
      case 0x2:
        o = this.getInstance(ServiceProviderDialogData);
        break;
      case 0x3:
        o = this.getInstance(InsuranceDialogData);
        break;
      default: break;
    }

    if (o && MODES.includes(action)) {
      switch (action) {
        case EndSheetLabelAction.ADD:
          o.add = true;
          break;
        case EndSheetLabelAction.EDIT:
          o.edit = true;
          break;
        case EndSheetLabelAction.DELETE:
          o.delete = true;
          break;
        default: break;
      }
    }

    config.data = o;

    return config;
  }

  findActionByName(action: string) { }

  findLabelByName(name: string): number {
    let n = 0x0;

    switch (name) {
      case EndSheetLabel.SERVICE:
        n = 0x1;
        break;
      case EndSheetLabel.SERVICE_PROVIDER:
        n = 0x2;
        break;
      case EndSheetLabel.INSURANCE:
        n = 0x3;
        break;
      default: break;
    }

    return n;
  }

  getInstance<A extends BaseDialogData>(c: new () => A): A {
    return new c();
  }
}
