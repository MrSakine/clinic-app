import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonStepComponent } from './person-step.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

@NgModule({
  declarations: [PersonStepComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxCleaveDirectiveModule,
  ],
  exports: [PersonStepComponent]
})

export class PersonStepModule { }