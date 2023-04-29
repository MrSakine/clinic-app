import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-step',
  templateUrl: './person-step.component.html',
  styleUrls: ['./person-step.component.scss']
})

export class PersonStepComponent implements OnInit {
  personStepFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.personStepFormGroup = this.formBuilder.group(
      {
        fullname: [null, [Validators.required]],
        address: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required]],
        dob: [null, [Validators.required]]
      }
    );
  }

}
