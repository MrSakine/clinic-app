import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersonStepInputLabel } from 'src/app/core/_enums/person-step-input-label';
import { IPat } from 'src/app/core/_interfaces/ipat';
import { SharePatDataSubscriptionService } from 'src/app/core/_subscriptions/share-pat-data-subscription.service';

@Component({
  selector: 'app-person-step',
  templateUrl: './person-step.component.html',
  styleUrls: ['./person-step.component.scss']
})

export class PersonStepComponent implements OnInit, OnDestroy {
  personStepFormGroup!: FormGroup;
  userDataSubscription!: Subscription;
  currentPat!: IPat;

  @Input() personStepChange?: string;
  @Output() shareFormData: EventEmitter<IPat> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private sharePatSubscriptionService: SharePatDataSubscriptionService,
  ) { }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.personStepFormGroup = this.formBuilder.group(
      {
        fullname: [null, [Validators.required]],
        address: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required]],
        dob: [null, [Validators.required]]
      }
    );

    this.getCurrentPat();
  }

  getCurrentPat() {
    this.userDataSubscription = this.sharePatSubscriptionService.getCurrent()
      .subscribe(
        val => {
          this.currentPat = val;
          this.setupDataToForm(this.currentPat);
        }
      );
  }

  setupDataToForm(data: IPat) {
    this.personStepFormGroup.controls['fullname'].setValue(data.fullname);
    this.personStepFormGroup.controls['address'].setValue(data.address);
    this.personStepFormGroup.controls['phoneNumber'].setValue(data.phone_number);
    this.personStepFormGroup.controls['dob'].setValue(data.dob.toString());
  }

  onValueChange(val: any, el: string) {
    let v = val.target.value;

    switch (el) {
      case PersonStepInputLabel.FN:
        this.currentPat.fullname = v;
        break;
      case PersonStepInputLabel.ADDR:
        this.currentPat.address = v;
        break;
      case PersonStepInputLabel.PN:
        this.currentPat.phone_number = v;
        break;
      case PersonStepInputLabel.DOB:
        this.currentPat.dob = v === 0 || v === "" ? 0 : !Number.isNaN(Number(v)) ? Number(v) : this.currentPat.dob;
        break;
      default: break;
    }

    this.sharePatSubscriptionService.changeCurrent(this.currentPat);
    this.getCurrentPat();

    this.shareFormData.emit(this.currentPat);
  }

}
