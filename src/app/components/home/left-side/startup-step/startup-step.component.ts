import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';

@Component({
  selector: 'app-startup-step',
  templateUrl: './startup-step.component.html',
  styleUrls: ['./startup-step.component.scss']
})

export class StartupStepComponent implements OnInit, OnChanges {
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() cashiers!: ICashier[];
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  @Output() startUse: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.onInputChange(changes);
  }

  ngOnInit(): void { }

  onButtonClick() {
    this.buttonClick.emit(true);
  }

  startUsing() {
    this.startUse.emit(true);
  }

  onInputChange(changes: SimpleChanges) {
    this.services = changes['services'].currentValue;
    this.serviceProviders = changes['serviceProviders'].currentValue;
    this.cashiers = changes['cashiers'].currentValue;
  }
}