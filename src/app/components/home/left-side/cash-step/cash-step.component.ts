import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { ICash } from 'src/app/core/_interfaces/icash';
import { IIns } from 'src/app/core/_interfaces/iins';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ISsp } from 'src/app/core/_interfaces/issp';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';

@Component({
  selector: 'app-cash-step',
  templateUrl: './cash-step.component.html',
  styleUrls: ['./cash-step.component.scss']
})

export class CashStepComponent implements OnInit, OnChanges {
  @Input() services!: IPrestation[];

  cashStepFormGroup!: FormGroup;
  currentData!: ICash;
  currentInsurance?: IIns;
  currentSSPs!: CustomSSP[];
  ssp!: ISsp;
  insurance_name!: string;
  insurance_percentage!: string;

  constructor(
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder,
  ) {
    this.setupData();
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.cashStepFormGroup = this.formBuilder.group(
      {
        total: [null, [Validators.required]],
        insurance_amount: [null, [Validators.required]],
        insurance_due: [null, [Validators.required]],
        patient_due: [null, [Validators.required]],
        amount_due: [null, [Validators.required]],
        amount_received: [null, [Validators.required]],
        amount_refund: [null, [Validators.required]]
      }
    );
  }

  setupData() {
    let table = this.databaseService.getTicketDocument();
    table
      .then(
        (val: ITicket) => {
          this.currentData = val.cash;
          this.currentInsurance = val.ins;
          this.getServiceAndServiceProviders(val.ssp.data);
          this.calculateAmount();
          this.setupFormGroupData();
        }
      )
      .catch(err => console.error(err));
  }

  calculateAmount() {
    let i = 0;
    let j = 0;

    this.currentSSPs.forEach(s => i += s.service.price);
    this.currentData.total = i;
    this.currentData.insurance_amount = 0;
    this.currentData.insurance_due = 0;
    this.currentData.patient_due = 0;
    this.currentData.amount_due = 0;
    this.currentData.amount_received = 0;
    this.currentData.amount_to_refund = 0;

    if (Array.isArray(this.currentInsurance) && this.currentInsurance?.insurance && this.currentInsurance?.insurance.length > 0) {
      let x = this.currentInsurance.insurance[0].percentage;
      let y = x / 100;
      let z = this.currentData.total * y;
      j = this.currentData.total - z;
    }
  }

  setupFormGroupData() {
    this.cashStepFormGroup.controls['total'].setValue(this.currentData.total);
    this.cashStepFormGroup.controls['insurance_amount'].setValue(this.currentData.insurance_amount?.toString());
    this.cashStepFormGroup.controls['insurance_due'].setValue(this.currentData.insurance_due?.toString());
    this.cashStepFormGroup.controls['patient_due'].setValue(this.currentData.patient_due.toString());
    this.cashStepFormGroup.controls['amount_due'].setValue(this.currentData.amount_due.toString());
    this.cashStepFormGroup.controls['amount_received'].setValue(this.currentData.amount_received.toString());
    this.cashStepFormGroup.controls['amount_refund'].setValue(this.currentData.amount_to_refund.toString());
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

}