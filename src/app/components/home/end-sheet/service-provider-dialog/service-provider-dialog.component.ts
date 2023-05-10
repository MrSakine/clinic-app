import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceProvider } from 'src/app/core/_classes/service-provider';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { ServiceProviderDialogData } from 'src/app/core/_dialog-data/service-provider-dialog-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-service-provider-dialog',
  templateUrl: './service-provider-dialog.component.html',
  styleUrls: ['./service-provider-dialog.component.scss']
})

export class ServiceProviderDialogComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  showExistError: boolean = false;
  serviceProviderFormGroup!: FormGroup;
  currentData!: BaseDialogData;
  services?: IPrestation[];

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) data: BaseDialogData,
    private matRef: MatDialogRef<ServiceProviderDialogComponent>,
  ) {
    this.currentData = data;

    if (this.currentData.add) {
      this.serviceProviderFormGroup = this.formBuilder.group(
        {
          name: new FormControl(null, [Validators.required]),
          surname: new FormControl(null, [Validators.required]),
          service: new FormControl(null, [Validators.required])
        }
      );
    } else {
      let data = this.currentData as ServiceProviderDialogData;
      let tmp = data.currentServiceProvider?.service.map(a => a.type);

      this.serviceProviderFormGroup = formBuilder.group(
        {
          name: new FormControl(data.currentServiceProvider?.name, [Validators.required]),
          surname: new FormControl(data.currentServiceProvider?.surname, [Validators.required]),
          service: new FormControl(tmp, [Validators.required])
        }
      );
    }

    this.services = (this.currentData as ServiceProviderDialogData).services;
  }

  ngOnInit(): void {
    this.serviceProviderFormGroup.get('surname')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
    this.serviceProviderFormGroup.get('name')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
  }

  onSubmit() {
    let data = this.getData();
    this.showSpinnerProgress = true;
    this.checkExistence(data);

    setTimeout(() => {
      if (this.showExistError) {
        this.showSpinnerProgress = false;
        return;
      } else {
        if (this.currentData.add) {
          this.databaseService.create(EndSheetLabel.SERVICE_PROVIDER, data);
        } else {
          this.databaseService.update(EndSheetLabel.SERVICE_PROVIDER, data);
        }

        setTimeout(() => { this.showExistError = false }, 3000);
        this.showSpinnerProgress = false;
        this.matRef.close({ action: this.currentData.add ? 'add' : 'edit', label: 'prest', item: this.currentData });
      }
    }, 100);
  }

  handleUserInput(val: any, mode: string | undefined | null): void { }

  getData(): ServiceProvider {
    let serviceProvider = new ServiceProvider();

    serviceProvider.id = (this.currentData as ServiceProviderDialogData).currentServiceProvider?.id;
    serviceProvider.firstname = this.serviceProviderFormGroup.controls['surname'].value;
    serviceProvider.lastname = this.serviceProviderFormGroup.controls['name'].value;
    serviceProvider.service = this.getSelectedServices(this.serviceProviderFormGroup.controls['service'].value);

    return serviceProvider;
  }

  checkExistence(value: ServiceProvider) {
    let table = this.databaseService.getDocument();

    table
      .then(
        (val: IBase) => {
          let found = val.serviceProviders.find(
            v => (v.name === value.lastname || v.name === value.firstname) &&
              (v.surname === value.firstname || v.surname === value.lastname) &&
              (v.service === value.service)
          );

          if (found) this.showExistError = true;
          else this.showExistError = false;
        }
      )
      .catch(err => console.error(err));
  }

  getSelectedServices(data: string[]): IPrestation[] {
    let tmp: IPrestation[] = [];

    data.forEach(d => {
      let a = this.services?.find(v => v.type === d);

      if (a) {
        tmp.push(a);
      }
    });

    return tmp;
  }

}