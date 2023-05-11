import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ins } from 'src/app/core/_classes/ins';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-insurance-step',
  templateUrl: './insurance-step.component.html',
  styleUrls: ['./insurance-step.component.scss']
})

export class InsuranceStepComponent implements OnInit, OnChanges {
  @Input() insurances!: IAssurance[];
  insuranceStepFormGroup!: FormGroup;
  currentInsurance?: IAssurance;
  showWarning: boolean = false;

  @Input() insuranceStepChange?: string;
  @Output() insuranceStepFormComplete: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
  ) {
    this.setupDefaultInsurance();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupInsurancesData(changes['insurances'] ? changes['insurances'].currentValue : this.insurances);

    if (changes['insuranceStepChange'].previousValue) {
      if (this.insuranceStepFormGroup.controls['ins'].invalid) {
        this.insuranceStepFormGroup.controls['ins'].markAsTouched({ onlySelf: true });
        this.insuranceStepFormComplete.emit(false);
      } else {
        let ins = new Ins();
        ins.data = this.currentInsurance as IAssurance;
        this.databaseService.createIns(ins);

        setTimeout(() => {
          this.insuranceStepFormComplete.emit(true);
        }, 100);
      }
    }
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

    this.setupDefaultInsurance();
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
    this.databaseService.getTicketDocument()
      .then(
        (val: ITicket) => {
          this.currentInsurance = val.ins?.insurance ? val.ins.insurance[0] as IAssurance : undefined;
          this.insuranceStepFormGroup.controls['ins'].setValue(this.currentInsurance?.name);
        }
      )
      .catch(err => console.error(err));
  }

}