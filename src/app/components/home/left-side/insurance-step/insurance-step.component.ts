import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';

@Component({
  selector: 'app-insurance-step',
  templateUrl: './insurance-step.component.html',
  styleUrls: ['./insurance-step.component.scss']
})

export class InsuranceStepComponent implements OnInit, OnChanges {
  @Input() insurances!: IAssurance[];
  insuranceStepFormGroup!: FormGroup;
  currentInsurance!: IAssurance;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.setupDefaultInsurance();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupInsurancesData(changes['insurances'].currentValue);
  }

  ngOnInit(): void {
    this.setupInsurancesData(undefined);
    this.insuranceStepFormGroup = this.formBuilder.group(
      {
        ins: [null, [Validators.required]]
      }
    );
  }

  setupInsurancesData(value: IAssurance[] | undefined) {
    if (value) {
      this.insurances = value;
    }
  }

  onInsuranceSelectChange(val: any) {
    if (val) {
      let value = val as string;
      this.currentInsurance = this.insurances.find(v => v.name === value) as IAssurance;
    } else {
      this.setupDefaultInsurance();
    }
  }

  setupDefaultInsurance() {
    this.currentInsurance = { id: 0, name: '', percentage: 0 };
  }

}