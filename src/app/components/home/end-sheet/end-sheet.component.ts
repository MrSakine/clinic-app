import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { ExistElementEvent } from 'src/app/core/_events/exist-element-event';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DeleteItemBottomSheetComponent } from './delete-item-bottom-sheet/delete-item-bottom-sheet.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SuccessMessageService } from 'src/app/core/_services/success-message.service';
import { SuccessMessage } from 'src/app/core/_interfaces/success-message';
import { DeleteItemBottomSheetData } from 'src/app/core/_bottom-sheet/delete-item-bottom-sheet-data';
import { ConstraintMessageService } from 'src/app/core/_services/constraint-message.service';
import { IConstraintMessage } from 'src/app/core/_interfaces/iconstraint-message';

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
  bottomSheetRef!: MatBottomSheetRef<DeleteItemBottomSheetComponent>;
  services!: IPrestation[];
  serviceProviders!: IPrestataire[];
  insurances!: IAssurance[];
  successMessages: Observable<SuccessMessage[]> = this.successMessageService.getAll();
  constraintMessages: Observable<IConstraintMessage[]> = this.constraintMessageService.getAll();

  @ViewChild('ersh', { read: ViewContainerRef }) root!: ViewContainerRef;

  constructor(
    private helperService: HelperService,
    private matDialog: MatDialog,
    private databaseService: DatabaseService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private successMessageService: SuccessMessageService,
    private constraintMessageService: ConstraintMessageService,
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
        this.constraintMessages.subscribe(
          val => {
            if (this.services.length <= 0) {
              let m = val.find(v => v.relatedTo === 'service-provider');
              this.openConstraintSnackBar(m?.message);
            } else {
              this.openServiceProviderDialog(null, whichLabel, action);
            }
          }
        );
        break;
      case 0x3:
        this.openInsuranceDialog(null, whichLabel, action);
        break;
      default: break;
    }
  }

  onListViewEvent(event: ExistElementEvent) {
    let action = event.action;
    let label = event.label;
    let whichLabel = this.findLabelByName(label);

    switch (whichLabel) {
      case 0x1:
        this.openServiceDialog(event.item, whichLabel, action);
        break;
      case 0x2:
        this.openServiceProviderDialog(event.item, whichLabel, action);
        break;
      case 0x3:
        this.openInsuranceDialog(event.item, whichLabel, action);
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
    if (action === EndSheetLabelAction.ADD || action === EndSheetLabelAction.EDIT) {
      let data = this.prepareDialogData("30%", service === null || undefined ? null : service, mode, action);
      this.ref = this.matDialog.open(ServiceDialogComponent, data);
      this.ref.afterClosed().subscribe(val => this.handleResult(val));
    } else {
      let data = this.prepareBottomSheetData(service === null || undefined ? null : service, mode);
      this.bottomSheetRef = this.bottomSheet.open(DeleteItemBottomSheetComponent, data);
      this.bottomSheetRef.afterDismissed().subscribe(val => this.handleResult(val));
    }
  }

  openServiceProviderDialog(serviceProvider: IPrestataire | null | undefined, mode: number, action: string) {
    if (action === EndSheetLabelAction.ADD || action === EndSheetLabelAction.EDIT) {
      let data = this.prepareDialogData("30%", serviceProvider === null || undefined ? null : serviceProvider, mode, action);
      this.ref = this.matDialog.open(ServiceProviderDialogComponent, data);
      this.ref.afterClosed().subscribe(val => this.handleResult(val));
    } else {
      let data = this.prepareBottomSheetData(serviceProvider === null || undefined ? null : serviceProvider, mode);
      this.bottomSheetRef = this.bottomSheet.open(DeleteItemBottomSheetComponent, data);
      this.bottomSheetRef.afterDismissed().subscribe(val => this.handleResult(val));
    }
  }

  openInsuranceDialog(insurance: IAssurance | null | undefined, mode: number, action: string) {
    if (action === EndSheetLabelAction.ADD || action === EndSheetLabelAction.EDIT) {
      let data = this.prepareDialogData("30%", insurance === null || undefined ? null : insurance, mode, action);
      this.ref = this.matDialog.open(InsuranceDialogComponent, data);
      this.ref.afterClosed().subscribe(val => this.handleResult(val));
    } else {
      let data = this.prepareBottomSheetData(insurance === null || undefined ? null : insurance, mode);
      this.bottomSheetRef = this.bottomSheet.open(DeleteItemBottomSheetComponent, data);
      this.bottomSheetRef.afterDismissed().subscribe(val => this.handleResult(val));
    }
  }

  openConstraintSnackBar(message: string | undefined) {
    let config = this.prepareSnackBarData();
    let m = String(message);

    this.snackBar.open(m, undefined, config);
  }

  openSnackBar(action: string, message: string | undefined) {
    let config = this.prepareSnackBarData();
    let m = String(message);

    switch (action) {
      case EndSheetLabelAction.ADD:
        this.snackBar.open(m, undefined, config);
        break;
      case EndSheetLabelAction.EDIT:
        this.snackBar.open(m, undefined, config);
        break;
      case EndSheetLabelAction.DELETE:
        this.snackBar.open(m, undefined, config);
        break;
      default: break;
    }
  }

  prepareBottomSheetData(obj: any | null | undefined, mode: number): MatBottomSheetConfig {
    let config = new MatBottomSheetConfig();
    let d = new DeleteItemBottomSheetData();

    config.viewContainerRef = this.root;
    d.mode = mode;
    d.item = obj;
    config.data = d;

    return config;
  }

  prepareSnackBarData(): MatSnackBarConfig {
    let config = new MatSnackBarConfig();
    config.duration = 5000;

    return config;
  }

  prepareDialogData(width: string, obj: any | null | undefined, mode: number, action: string): MatDialogConfig {
    let config = new MatDialogConfig();
    let elementRef = document.getElementById('app-right-sheet');
    let rect = elementRef?.getBoundingClientRect();
    config.width = width;
    config.position = {
      top: String(Number(rect?.top) + 150) + 'px',
      left: String(Number(rect?.left) + 120) + 'px',
      right: String(rect?.right) + 'px',
    };

    const ACTIONS = ["add", "edit", "delete"];
    let o = null;

    switch (mode) {
      case 0x1:
        o = this.getInstance(ServiceDialogData);
        o.currentService = obj as IPrestation;
        break;
      case 0x2:
        o = this.getInstance(ServiceProviderDialogData);
        o.currentServiceProvider = obj as IPrestataire;
        o.services = this.services;
        break;
      case 0x3:
        o = this.getInstance(InsuranceDialogData);
        o.currentInsurance = obj as IAssurance;
        break;
      default: break;
    }

    if (o && ACTIONS.includes(action)) {
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

  handleResult(val: any) {
    let t = val as ExistElementEvent;
    let m = null;
    let item = null;

    if (t) {
      this.setupData();
      this.successMessages
        .subscribe(
          val => {
            switch (t.label) {
              case EndSheetLabel.SERVICE:
                m = val.find(v => v.relatedTo === 'service');
                item = t.item as any;

                switch (t.action) {
                  case EndSheetLabelAction.ADD:
                    this.openSnackBar(t.action, m?.added);
                    break;
                  case EndSheetLabelAction.EDIT:
                    this.openSnackBar(t.action, m?.edited?.replace('%1$', String(item.currentService?.type)));
                    break;
                  case EndSheetLabelAction.DELETE:
                    this.openSnackBar(t.action, m?.deleted?.replace('%1$', String(item.type)));
                    break;
                  default: break;
                }

                break;
              case EndSheetLabel.SERVICE_PROVIDER:
                m = val.find(v => v.relatedTo === 'service-provider');
                item = t.item as any;
                let text = null;
                let sc = null;

                switch (t.action) {
                  case EndSheetLabelAction.ADD:
                    this.openSnackBar(t.action, m?.added);
                    break;
                  case EndSheetLabelAction.EDIT:
                    sc = (item as ServiceProviderDialogData);
                    text = String(sc.currentServiceProvider?.surname) + ' ' + String(sc.currentServiceProvider?.name);
                    this.openSnackBar(t.action, m?.edited?.replace('%1$', text));
                    break;
                  case EndSheetLabelAction.DELETE:
                    sc = (item as IPrestataire);
                    text = String(sc.surname) + ' ' + String(sc.name);
                    this.openSnackBar(t.action, m?.deleted?.replace('%1$', text));
                    break;
                  default: break;
                }
                break;
              case EndSheetLabel.INSURANCE:
                m = val.find(v => v.relatedTo === 'insurance');
                item = t.item as any;
                let name = null;
                let ins = null;

                switch (t.action) {
                  case EndSheetLabelAction.ADD:
                    this.openSnackBar(t.action, m?.added);
                    break;
                  case EndSheetLabelAction.EDIT:
                    ins = (item as InsuranceDialogData);
                    name = String(ins.currentInsurance?.name);
                    this.openSnackBar(t.action, m?.edited?.replace('%1$', name));
                    break;
                  case EndSheetLabelAction.DELETE:
                    ins = (item as IAssurance);
                    name = String(ins.name);
                    this.openSnackBar(t.action, m?.deleted?.replace('%1$', name));
                    break;
                  default: break;
                }
                break;
              default: break;
            }
          }
        );
    }
  }
}
