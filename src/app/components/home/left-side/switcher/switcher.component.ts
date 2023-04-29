import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { SwitcherAction } from 'src/app/core/_interfaces/switcher-action';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})

export class SwitcherComponent implements OnInit, OnChanges {
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() insurances!: IAssurance[];
  @Input() cashiers!: ICashier[];
  @Input() switcher!: SwitcherAction;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.switcher = changes['switcher'].currentValue;
  }
}