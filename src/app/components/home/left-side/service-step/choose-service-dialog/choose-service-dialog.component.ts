import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChooseServiceDialogData } from 'src/app/core/_dialog-data/choose-service-dialog-data';

@Component({
  selector: 'app-choose-service-dialog',
  templateUrl: './choose-service-dialog.component.html',
  styleUrls: ['./choose-service-dialog.component.scss']
})

export class ChooseServiceDialogComponent implements OnInit {
  currentData!: ChooseServiceDialogData;
  chooseServiceFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ChooseServiceDialogData,
    private formBuilder: FormBuilder,
    private matRef: MatDialogRef<ChooseServiceDialogComponent>,
  ) {
    this.currentData = data;
  }

  ngOnInit(): void {
    this.chooseServiceFormGroup = this.formBuilder.group(
      {
        service: [null, [Validators.required]],
        serviceProvider: [null, [Validators.required]]
      }
    );
  }

  onSubmit() {
    this.matRef.close(true);
  }

}
