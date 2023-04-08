import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/core/_classes/service';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { DatabaseService } from 'src/app/core/_services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})

export class ServiceDialogComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  serviceFormGroup!: FormGroup;
  matRef!: MatDialogRef<ServiceDialogComponent>;
  showPriceError: boolean = false;
  mode: string = "service";
  currentData!: BaseDialogData;

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) data: BaseDialogData,
  ) {
    this.serviceFormGroup = this.formBuilder.group(
      {
        type: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required])
      }
    );

    this.currentData = data;
  }

  ngOnInit(): void {
    this.serviceFormGroup.get('type')?.valueChanges.subscribe(val => this.handleUserInput(val, null));
    this.serviceFormGroup.get('price')?.valueChanges.subscribe(val => this.handleUserInput(val, "number"));
  }

  saveData(): void {
    if (this.serviceFormGroup.invalid || this.showPriceError) {
      return;
    }

    this.showSpinnerProgress = true;
    let data = this.getData();

    if (this.currentData.add) {
      this.databaseService.create(EndSheetLabel.SERVICE, data);
    } else if (this.currentData.edit) {

    } else {
      // pass;
    }
  }

  handleUserInput(val: any, mode: string | undefined | null) {
    if (mode === "number") {
      if (typeof val !== "number") {
        this.showPriceError = true;
      } else {
        this.showPriceError = false;
      }
    }
  }

  getData(): Service {
    let service = new Service();

    service.type = this.serviceFormGroup.controls['type'].value;
    service.price = Number(this.serviceFormGroup.controls['price'].value);

    return service;
  }
}
