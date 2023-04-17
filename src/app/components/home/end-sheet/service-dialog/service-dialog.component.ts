import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/core/_classes/service';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { ServiceDialogData } from 'src/app/core/_dialog-data/service-dialog-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})

export class ServiceDialogComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  serviceFormGroup!: FormGroup;
  showPriceError: boolean = false;
  showTypeError: boolean = false;
  currentData!: BaseDialogData;

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) data: BaseDialogData,
    private matRef: MatDialogRef<ServiceDialogComponent>,
  ) {
    this.currentData = data;
    if (this.currentData.add) {
      this.serviceFormGroup = this.formBuilder.group(
        {
          type: new FormControl(null, [Validators.required]),
          price: new FormControl(null, [Validators.required])
        }
      );
    } else {
      let data = this.currentData as ServiceDialogData;
      this.serviceFormGroup = formBuilder.group(
        {
          type: new FormControl(data.currentService?.type, [Validators.required]),
          price: new FormControl(data.currentService?.price, [Validators.required])
        }
      );
    }
  }

  ngOnInit(): void {
    this.serviceFormGroup.get('type')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
    this.serviceFormGroup.get('price')?.valueChanges.subscribe(val => this.handleUserInput(val, "number"));
  }

  saveData(): void {
    let data = this.getData();
    this.showSpinnerProgress = true;
    this.checkExistence(data.type);

    if (this.serviceFormGroup.invalid || this.showPriceError || this.showTypeError) {
      this.showSpinnerProgress = false;
      return;
    } else if (this.showPriceError || this.showTypeError) {
      return;
    } else {
      if (this.currentData.add) {
        this.databaseService.create(EndSheetLabel.SERVICE, data);
      } else {
        this.databaseService.update(EndSheetLabel.SERVICE, data);
      }

      this.showSpinnerProgress = false;
      this.matRef.close({ action: this.currentData.add ? 'add' : 'edit', label: 'pres', item: this.currentData });
    }
  }

  handleUserInput(val: any, mode: string | undefined | null) {
    if (mode === "number") {
      if (typeof val !== "number") {
        this.showPriceError = true;
      } else {
        this.showPriceError = false;
      }
    } else {
      this.checkExistence(val);
    }
  }

  getData(): Service {
    let service = new Service();

    service.id = (this.currentData as ServiceDialogData).currentService?.id;
    service.type = this.serviceFormGroup.controls['type'].value;
    service.price = Number(this.serviceFormGroup.controls['price'].value);

    return service;
  }

  checkExistence(value: string) {
    let table = this.databaseService.getDocument();

    table
      .then(
        (val: IBase) => {
          let found = val.services.find(v => v.type === value);

          if (found) this.showTypeError = true;
          else this.showTypeError = false;
        }
      )
      .catch(err => console.error(err));
  }
}
