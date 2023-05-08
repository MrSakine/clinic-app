import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ChooseServiceDialogData } from 'src/app/core/_dialog-data/choose-service-dialog-data';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ChooseServiceDialogComponent } from './choose-service-dialog/choose-service-dialog.component';
import { ISsp } from 'src/app/core/_interfaces/issp';
import { DatabaseService } from 'src/app/core/_services/database.service';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-step',
  templateUrl: './service-step.component.html',
  styleUrls: ['./service-step.component.scss']
})

export class ServiceStepComponent implements OnInit, OnChanges {
  ref!: MatDialogRef<any>;
  serviceStepFormGroup!: FormGroup;
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() cashiers!: ICashier[];
  @Input() formChange?: string;
  @Output() formComplete: EventEmitter<any> = new EventEmitter();
  @Output() itemAction: EventEmitter<any> = new EventEmitter();

  currentSSPs!: CustomSSP[];
  ssp!: ISsp;
  hasInsurance: boolean = false;
  currentCashier?: ICashier;
  showWarning: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private databaseService: DatabaseService,
    private matSnackbar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.fetchDataFromDatabase();

    this.currentSSPs = [];
    this.serviceStepFormGroup = this.formBuilder.group(
      {
        hasInsurance: [false, []],
        cashier: [null, [Validators.required]]
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formChange'] && changes['formChange'].previousValue) {
      if (this.serviceStepFormGroup.controls['cashier'].invalid) {
        this.serviceStepFormGroup.controls['cashier'].markAsTouched({ onlySelf: true });
        this.formComplete.emit(false);
      } else if (this.currentSSPs.length <= 0) {
        this.showWarning = true;
        this.formComplete.emit(false);
      } else {
        this.formComplete.emit(true);
      }
    }
  }

  ngOnInit(): void {
    this.setupData();
  }

  setupData() {
    this.databaseService
      .getTicketDocument()
      .then(
        (val: ITicket) => {
          this.ssp = val.ssp;
          this.getServiceAndServiceProviders(this.ssp.data);
        }
      )
      .catch(err => console.error(err));
  }

  fetchDataFromDatabase() {
    let table = this.databaseService.getTicketDocument();
    table
      .then(
        (val: ITicket) => {
          this.currentCashier = val.ssp.cashier;
          this.serviceStepFormGroup.controls['cashier'].setValue(this.currentCashier.firstname);
          this.serviceStepFormGroup.controls['hasInsurance'].setValue(val.ssp.hasInsurance);
        }
      )
      .catch(err => console.error(err));
  }

  getServiceAndServiceProviders(data: Array<Record<string, IPrestataire>>) {
    let tmp: CustomSSP[] = [];
    let i = 1;

    if (data) {
      data.forEach(d => {
        Object.keys(d).forEach((key: string) => {
          let a = this.services.find(v => String(v.id) === key);

          if (a) {
            tmp.push({ id: i, service: a, serviceProvider: d[key] });
          }

          i += 1;
        });
      });
    }

    this.currentSSPs = tmp;
  }

  openChooseServiceDialog() {
    if (this.currentSSPs.length >= 3) {
      let config = this.prepareSnackBarData();
      this.matSnackbar.open("Le nombre maximum de prestations a été atteinte", undefined, config);
      return;
    }

    let data = this.prepareDialogData("35%", 0x0, null);
    this.ref = this.matDialog.open(ChooseServiceDialogComponent, data);
    this.ref.afterClosed().subscribe(val => this.handleSSPAdded(val));
  }

  openEditServiceDialog(current: CustomSSP) {
    let data = this.prepareDialogData("35%", 0x1, current);
    this.ref = this.matDialog.open(ChooseServiceDialogComponent, data);
    this.ref.afterClosed().subscribe(val => this.handleSSPAdded(val));
  }

  openDeleteServiceDialog(current: CustomSSP) {
    let data = this.prepareDialogData("35%", 0x2, current);
    this.ref = this.matDialog.open(ChooseServiceDialogComponent, data);
    this.ref.afterClosed().subscribe(val => this.handleSSPAdded(val));
  }

  prepareDialogData(width: string, mode: number, obj: any | null): MatDialogConfig {
    let config = new MatDialogConfig();
    let data = new ChooseServiceDialogData();

    config.width = width;
    data.services = this.services;
    data.serviceProviders = this.serviceProviders;

    switch (mode) {
      case 0x0:
        data.add = true;
        break;
      case 0x1:
        data.edit = true;
        data.currentSSP = obj as CustomSSP;
        break;
      case 0x2:
        data.delete = true;
        data.currentSSP = obj as CustomSSP;
        break;
      default: break;
    }

    config.data = data;

    return config;
  }

  prepareSnackBarData(): MatSnackBarConfig {
    let config = new MatSnackBarConfig();
    config.duration = 2000;

    return config;
  }

  handleSSPAdded(val: any) {
    let config = this.prepareSnackBarData();

    if (val !== undefined && val.status) {
      switch (val.mode) {
        case 'add':
          this.matSnackbar.open("Prestation ajoutée avec succès", undefined, config);
          break;
        case 'edit':
          this.matSnackbar.open("Prestation modifiée avec succès", undefined, config);
          break;
        case 'delete':
          this.matSnackbar.open("Prestation supprimée avec succès", undefined, config);
          break;
      }

      this.setupData();
      this.itemAction.emit(true);
      this.showWarning = false;
    }
  }

  onCashierChange(e: any) {
    if (e !== undefined) {
      let cashier = this.cashiers.find(v => v.firstname === e) as ICashier;
      this.databaseService.insertCashier(cashier);

      setTimeout(() => {
        this.itemAction.emit(true);
      }, 100);
    }
  }

  onCheckboxClick() {
    this.hasInsurance = this.serviceStepFormGroup.controls['hasInsurance'].value as boolean;
    this.databaseService.insertHasInsurance(this.hasInsurance);

    setTimeout(() => {
      this.itemAction.emit(true);
    }, 100);
  }

}