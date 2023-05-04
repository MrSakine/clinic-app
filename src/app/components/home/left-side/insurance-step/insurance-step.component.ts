import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';

@Component({
  selector: 'app-insurance-step',
  templateUrl: './insurance-step.component.html',
  styleUrls: ['./insurance-step.component.scss']
})

export class InsuranceStepComponent implements OnInit, OnChanges {
  @Input() insurances!: IAssurance[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void { }

}