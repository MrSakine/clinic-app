import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashStepInputLabel } from 'src/app/core/_enums/cash-step-input-label';
import { CustomSSP } from 'src/app/core/_interfaces/custom-ssp';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ICash } from 'src/app/core/_interfaces/icash';
import { IIns } from 'src/app/core/_interfaces/iins';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ISsp } from 'src/app/core/_interfaces/issp';
import { ITicket } from 'src/app/core/_interfaces/iticket';
import { DatabaseService } from 'src/app/core/_services/database.service';
import { ShareCashDataSubscriptionService } from 'src/app/core/_subscriptions/share-cash-data-subscription.service';

@Component({
  selector: 'app-cash-step',
  templateUrl: './cash-step.component.html',
  styleUrls: ['./cash-step.component.scss']
})

export class CashStepComponent implements OnInit, OnChanges, OnDestroy {
  @Input() services!: IPrestation[];
  @Input() cashStepChange?: string;
  @Output() cashStepFormComplete: EventEmitter<any> = new EventEmitter();

  cashStepFormGroup!: FormGroup;
  currentData!: ICash;
  currentInsurance?: IIns;
  currentSSPs!: CustomSSP[];
  ssp!: ISsp;
  insurance_name!: string;
  insurance_percentage!: string;
  insurance_amount_text!: string;
  default_insurance_amount_text: string = 'Montant assurance';
  var_insurance_amount_text: string = 'Montant %s';
  insurance_amount_due_text!: string;
  var_insurance_amount_due_text: string = 'Rester à payer par le tiers payant (%s / %s %)';
  default_insurance_amount_due_text: string = 'Rester à payer par le tiers payant';

  shareCashSubscription!: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder,
    private shareCashSubscriptionService: ShareCashDataSubscriptionService,
  ) {
    this.setupData();
  }

  ngOnDestroy(): void {
    this.shareCashSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cashStepChange'] && changes['cashStepChange'].previousValue) {
      if (this.cashStepFormGroup.valid) {
        this.cashStepFormComplete.emit(true);
      }
    }

    this.setupData();
  }

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

    this.shareCashSubscription = this.shareCashSubscriptionService.getCurrent().subscribe(() => { });
  }

  setupData() {
    this.setupCashData();

    setTimeout(() => {
      let table = this.databaseService.getTicketDocument();
      table
        .then(
          (val: ITicket) => {
            this.currentInsurance = val.ins;
            this.ssp = val.ssp;
            this.setupInsuranceAmount(val.ssp, this.currentInsurance?.insurance[0]);
            this.getServiceAndServiceProviders(val.ssp.data);
            this.calculateAmount();
            this.disableInput();
            this.setupFormGroupData();
          }
        )
        .catch(err => console.error(err));
    }, 100);
  }

  setupCashData() {
    this.shareCashSubscriptionService.getCurrent()
      .subscribe(val => {
        this.currentData = val;
      });
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

    if (this.currentInsurance !== undefined && this.ssp.hasInsurance && this.currentInsurance?.insurance.length > 0) {
      let x = Number(this.currentInsurance.insurance[0].percentage);
      let y = x / 100;
      let z = this.currentData.total * y;
      j = this.currentData.total - z;

      this.currentData.insurance_due = j;
      this.currentData.patient_due = this.currentData.total - j;
    } else {
      this.currentData.insurance_due = 0;
      this.currentData.patient_due = this.currentData.total;
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

  disableInput() {
    this.cashStepFormGroup.controls['total'].disable({ onlySelf: true });
    this.cashStepFormGroup.controls['insurance_due'].disable({ onlySelf: true });
    this.cashStepFormGroup.controls['patient_due'].disable({ onlySelf: true });
  }

  setupInsuranceAmount(s: ISsp, i: IAssurance | undefined) {
    if (s.hasInsurance) {
      this.insurance_amount_text = this.var_insurance_amount_text.replace('%s', String(i?.name));
      this.insurance_amount_due_text = this.var_insurance_amount_due_text
        .replace('%s', String(i?.name)).replace('%s', String(i?.percentage));
    } else {
      this.insurance_amount_text = this.default_insurance_amount_text;
      this.insurance_amount_due_text = this.default_insurance_amount_due_text;
    }
  }

  onValueChange(val: any, el: string) {
    let v = Number(val.target.value);

    switch (el) {
      case CashStepInputLabel.INSURANCE_AMOUNT:
        this.currentData.insurance_amount = !Number.isNaN(v) ? v : this.currentData.insurance_amount;
        break;
      case CashStepInputLabel.AMOUNT_RECEIVED:
        this.currentData.amount_received = !Number.isNaN(v) ? v : this.currentData.amount_received;
        this.currentData.amount_due = this.currentData.patient_due - this.currentData.amount_received;
        this.currentData.amount_due = this.currentData.amount_due < 0 ? 0 : this.currentData.amount_due;

        let n = this.currentData.patient_due - this.currentData.amount_received;
        let m = String(n);
        let o = m.split('-');

        this.currentData.amount_to_refund = o[1] === undefined ? 0 : Number(o[1]);
        break;
      case CashStepInputLabel.AMOUNT_DUE:
        break;
      case CashStepInputLabel.AMOUNT_TO_REFUND:
        break;
      default: break;
    }

    this.shareCashSubscriptionService.changeCurrent(this.currentData);
    this.setupCashData();
    this.setupFormGroupData();
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