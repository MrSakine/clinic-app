import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Insurance } from 'src/app/core/_classes/insurance';
import { BaseDialogData } from 'src/app/core/_dialog-data/base-dialog-data';
import { InsuranceDialogData } from 'src/app/core/_dialog-data/insurance-dialog-data';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { IBase } from 'src/app/core/_interfaces/ibase';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-insurance-dialog',
  templateUrl: './insurance-dialog.component.html',
  styleUrls: ['./insurance-dialog.component.scss']
})
export class InsuranceDialogComponent implements OnInit {
  showSpinnerProgress: boolean = false;
  currentData!: BaseDialogData;
  insuranceFormGroup!: FormGroup;
  showPercentageError: boolean = false;
  showNameError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) data: BaseDialogData,
    private matRef: MatDialogRef<InsuranceDialogComponent>,
  ) {
    this.currentData = data;

    if (this.currentData.add) {
      this.insuranceFormGroup = this.formBuilder.group(
        {
          name: new FormControl(null, [Validators.required]),
          percentage: new FormControl(null, [Validators.required])
        }
      );
    } else {
      let data = this.currentData as InsuranceDialogData;
      this.insuranceFormGroup = this.formBuilder.group(
        {
          name: new FormControl(data.currentInsurance?.name, [Validators.required]),
          percentage: new FormControl(data.currentInsurance?.percentage, [Validators.required])
        }
      );
    }
  }

  ngOnInit(): void {
    this.insuranceFormGroup.get('name')?.valueChanges.subscribe(val => this.handleUserInput(val, "string"));
    this.insuranceFormGroup.get('percentage')?.valueChanges.subscribe(val => this.handleUserInput(val, "number"));
  }

  onSubmit(e: any): void {
    let data = this.getData();
    this.showSpinnerProgress = true;
    this.checkExistence(String(data.name));

    setTimeout(() => {
      if (this.showNameError || this.showPercentageError || this.insuranceFormGroup.invalid) {
        return;
      } else if (this.insuranceFormGroup.valid && this.showNameError || this.showPercentageError) {
        return;
      } else {
        if (this.currentData.add) {
          this.databaseService.create(EndSheetLabel.INSURANCE, data);
        } else {
          this.databaseService.update(EndSheetLabel.INSURANCE, data);
        }

        this.showSpinnerProgress = false;
        this.matRef.close({ action: this.currentData.add ? 'add' : 'edit', label: 'ins', item: this.currentData });
      }
    }, 100);
  }

  handleUserInput(val: any, mode: string | undefined | null) {
    if (mode === "number") {
      if (typeof val !== "number") {
        this.showPercentageError = true;
      } else {
        this.showPercentageError = false;

        let n = Number(val);

        if (n > 0 && (100 - n) >= 0) {
          this.showPercentageError = false;
        } else {
          this.showPercentageError = true;
        }
      }

    } else {
      this.checkExistence(val);
    }
  }

  getData(): Insurance {
    let insurance = new Insurance();

    insurance.id = (this.currentData as InsuranceDialogData).currentInsurance?.id;
    insurance.name = this.insuranceFormGroup.controls['name'].value;
    insurance.percentage = Number(this.insuranceFormGroup.controls['percentage'].value);

    return insurance;
  }

  checkExistence(value: string) {
    let table = this.databaseService.getDocument();

    table
      .then(
        (val: IBase) => {
          let found = val.insurances.find(v => v.name.toLowerCase().trim() === value.toLowerCase().trim());
          this.showNameError = found === undefined ? false : true;
        }
      )
      .catch(err => console.error(err));
  }
}
