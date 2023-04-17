import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cashier } from 'src/app/core/_classes/cashier';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { CashierDialogData } from 'src/app/core/_dialog-data/cashier-dialog-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-cashier-dialog',
  templateUrl: './cashier-dialog.component.html',
  styleUrls: ['./cashier-dialog.component.scss']
})

export class CashierDialogComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  cashierFormGroup!: FormGroup;
  currentData!: BaseDialogData;
  showExistence: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) data: BaseDialogData,
    private matRef: MatDialogRef<CashierDialogComponent>,
  ) {
    this.currentData = data;

    if (this.currentData.add) {
      this.cashierFormGroup = this.formBuilder.group(
        {
          firstname: new FormControl(null, [Validators.required]),
          lastname: new FormControl(null, [Validators.required])
        }
      );
    } else {
      let data = this.currentData as CashierDialogData;
      this.cashierFormGroup = formBuilder.group(
        {
          firstname: new FormControl(data.currentCashier?.firstname, [Validators.required]),
          lastname: new FormControl(data.currentCashier?.lastname, [Validators.required])
        }
      );
    }
  }

  ngOnInit(): void {
    this.cashierFormGroup.get('firstname')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
    this.cashierFormGroup.get('lastname')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
  }

  saveData() {
    let data = this.getData();
    this.showSpinnerProgress = true;
    this.checkExistence(data);

    if (this.showExistence) {
      this.showSpinnerProgress = false;
      setTimeout(() => { this.showExistence = false }, 3000);
      return;
    } else {
      if (this.currentData.add) {
        this.databaseService.create(EndSheetLabel.CASHIER, data);
      } else {
        this.databaseService.update(EndSheetLabel.CASHIER, data);
      }

      this.showSpinnerProgress = false;
      this.matRef.close({ action: this.currentData.add ? 'add' : 'edit', label: 'cashier', item: this.currentData });
    }
  }

  getData(): Cashier {
    let cashier = new Cashier();

    cashier.id = (this.currentData as CashierDialogData).currentCashier?.id;
    cashier.firstname = this.cashierFormGroup.controls['firstname'].value;
    cashier.lastname = this.cashierFormGroup.controls['lastname'].value;

    return cashier;
  }

  handleUserInput(val: any, mode: string | undefined | null) { }

  checkExistence(value: Cashier) {
    let table = this.databaseService.getDocument();

    table
      .then(
        (val: IBase) => {
          let found = val.cashiers.find(v => v.firstname === value.firstname && v.lastname === value.lastname);

          if (found) this.showExistence = true;
          else this.showExistence = false;
        }
      )
      .catch(err => console.error(err));
  }

}
