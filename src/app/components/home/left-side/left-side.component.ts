import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SwitcherStepLabel } from 'src/app/core/_enums/switcher-step-label';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { SwitcherAction } from 'src/app/core/_interfaces/switcher-action';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit, OnChanges {
  showSwitcher: boolean = false;
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() insurances!: IAssurance[];
  @Input() cashiers!: ICashier[];
  @Output() showMenu: EventEmitter<any> = new EventEmitter();
  switcher: SwitcherAction;
  steps: string[] = [];

  constructor() {
    this.switcher = { previous: null, current: "service", go_next: false };
    this.steps = ["service", "insurance", "person", "cash"];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onInputChange(changes);
  }

  ngOnInit(): void {
    this.handleSwitcher();
  }

  startupMenuEvent(e: any) {
    this.showMenu.emit(e);
  }

  handleSwitcher() {
    if (
      (this.services !== undefined && this.services.length <= 0) &&
      (this.serviceProviders !== undefined && this.serviceProviders.length <= 0) &&
      (this.cashiers !== undefined && this.cashiers.length <= 0)
    ) {
      this.showSwitcher = false;
    } else if (
      (this.services === undefined) && (this.serviceProviders === undefined) && (this.cashiers === undefined)
    ) {
      this.showSwitcher = false;
    } else if (
      (this.services !== undefined && this.services.length <= 0) ||
      (this.serviceProviders !== undefined && this.serviceProviders.length <= 0) ||
      (this.cashiers !== undefined && this.cashiers.length <= 0)
    ) {
      this.showSwitcher = false;
    } else {
      this.showSwitcher = true;
    }
  }

  moveSwitcherForward() {
    let step = this.getCurrentStep();
    let next = this.getNextStep(step, false);

    if (next !== undefined) {
      switch (step) {
        case SwitcherStepLabel.SERVICE: break;
        case SwitcherStepLabel.INSURANCE: break;
        case SwitcherStepLabel.PERSON: break;
        case SwitcherStepLabel.CASH: break;
        default: break;
      }

      this.switcher = { previous: step, current: next, go_next: true };
    }
  }

  moveSwitcherBackward() {
    let step = this.getCurrentStep();
    let prev = this.getNextStep(step, true);

    if (prev !== undefined) {
      switch (step) {
        case SwitcherStepLabel.SERVICE: break;
        case SwitcherStepLabel.INSURANCE: break;
        case SwitcherStepLabel.PERSON: break;
        case SwitcherStepLabel.CASH: break;
        default: break;
      }

      this.switcher = { previous: step, current: prev, go_next: true };
    }
  }

  getCurrentStep(): string | undefined {
    return this.steps.find(step => this.switcher.current === step);
  }

  getNextStep(current: string | undefined, mode: boolean | null): string | null {
    if (mode) {
      for (let j = this.steps.length - 1; j >= 0; j--) {
        if (this.steps[j] === current) {
          return this.steps[j - 1];
        }
      }
    } else {
      for (let i = 0; i < this.steps.length; i++) {
        if (this.steps[i] === current) {
          return this.steps[i + 1];
        }
      }
    }

    return null;
  }

  onInputChange(changes: SimpleChanges) {
    this.services = changes['services'].currentValue;
    this.serviceProviders = changes['serviceProviders'].currentValue;
    this.cashiers = changes['cashiers'].currentValue;

    this.handleSwitcher();
  }
}