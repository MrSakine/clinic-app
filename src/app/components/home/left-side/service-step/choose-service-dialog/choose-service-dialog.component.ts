import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ssp } from 'src/app/core/_classes/ssp';
import { ChooseServiceDialogData } from 'src/app/core/_dialog-data/choose-service-dialog-data';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-choose-service-dialog',
  templateUrl: './choose-service-dialog.component.html',
  styleUrls: ['./choose-service-dialog.component.scss']
})

export class ChooseServiceDialogComponent implements OnInit {
  currentData!: ChooseServiceDialogData;
  chooseServiceFormGroup!: FormGroup;
  isExist: boolean = false;
  addProvider: boolean = false;
  filteredProviders!: IPrestataire[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ChooseServiceDialogData,
    private formBuilder: FormBuilder,
    private matRef: MatDialogRef<ChooseServiceDialogComponent>,
    private databaseService: DatabaseService,
  ) {
    this.currentData = data;
    this.filteredProviders = this.currentData.serviceProviders;
  }

  ngOnInit(): void {
    if (this.currentData.add) {
      this.chooseServiceFormGroup = this.formBuilder.group(
        {
          service: [null, [Validators.required]],
          serviceProvider: [null, [Validators.required]]
        }
      );
    } else {
      this.chooseServiceFormGroup = this.formBuilder.group(
        {
          service: [this.currentData.currentSSP.service.type, [Validators.required]],
          serviceProvider: [this.currentData.currentSSP.serviceProvider.id, [Validators.required]]
        }
      );

      this.onServiceChange(this.currentData.currentSSP.service.type);
    }
  }

  onServiceChange(value: any) {
    let tmp = this.currentData.serviceProviders;
    let tmp2: IPrestataire[] = [];

    tmp.forEach(t => {
      t.service.forEach(d => {
        if (d.type === value) {
          tmp2.push(t);
        }
      });
    });

    this.filteredProviders = tmp2.length > 0 ? tmp2 : [];
    this.addProvider = this.filteredProviders.length < 0 ? true : false;
  }

  onSubmit() {
    let mode = null;

    if (this.chooseServiceFormGroup.invalid) {
      return;
    }

    let x = new Ssp();
    let y = this.chooseServiceFormGroup.controls['service'].value;
    let z = this.chooseServiceFormGroup.controls['serviceProvider'].value;
    let service: IPrestation | undefined = this.currentData.services.find(v => v.type === y);
    let serviceProvider: IPrestataire | undefined = this.currentData.serviceProviders.find(v => v.id === z);
    let data = this.setupRecord(service, serviceProvider);

    x.cashier = {};
    x.hasInsurance = false;
    x.data = data;
    this.checkExistence(x.data);

    setTimeout(() => {
      if (this.isExist && !this.currentData.delete) {
        return;
      } else {
        if (this.currentData.add) {
          mode = 'add';
          this.databaseService.createSSP(x);
        } else if (this.currentData.edit) {
          mode = 'edit';
          this.databaseService.updateSSP(x, this.currentData.currentSSP, 0x0);
        } else {
          mode = 'delete';
          let d = this.setupRecord(this.currentData.currentSSP.service, this.currentData.currentSSP.serviceProvider);
          let y = new Ssp();
          y.cashier = {};
          y.hasInsurance = false;
          y.data = d;

          this.databaseService.updateSSP(y, undefined, 0x1);
        }

        this.matRef.close({ status: true, mode: mode });
      }
    }, 100);

    setTimeout(() => { this.isExist = false }, 4000);
  }

  setupRecord(s: IPrestation | undefined, sp: IPrestataire | undefined): Record<string, IPrestataire> {
    let d: Record<string, IPrestataire> = {};
    let id = String(s?.id);

    d[id] = sp as IPrestataire;

    return d;
  }

  checkExistence(data: Record<string, IPrestataire>) {
    let table = this.databaseService.getTicketDocument();

    table
      .then(
        (val: ITicket) => {
          let d = val.ssp.data;

          d.forEach(el => {
            let j = JSON.stringify(el);
            let j2 = JSON.stringify(data);

            if (j === j2) {
              this.isExist = true;
            }
          })
        }
      )
      .catch(err => console.error(err));
  }

}
