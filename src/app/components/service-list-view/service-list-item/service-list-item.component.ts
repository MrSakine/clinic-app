import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { ExistElementEvent } from 'src/app/core/_events/exist-element-event';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.scss']
})

export class ServiceListItemComponent implements OnInit, OnChanges {
  @Input() obj!: any;
  @Input() label!: string;
  @Output() event: EventEmitter<ExistElementEvent> = new EventEmitter<ExistElementEvent>();

  currentItem!: any;

  constructor() { }

  ngOnInit(): void {
    this.getData(this.obj);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData(changes['obj'].currentValue);
  }

  getData(value: any | undefined) {
    let t = null;

    if (!value) {
      t = this.obj;
    } else {
      t = value;
    }

    this.currentItem = t;

    switch (this.label) {
      case EndSheetLabel.SERVICE:
        this.currentItem = this.currentItem as IPrestation;
        break;
      case EndSheetLabel.SERVICE_PROVIDER:
        this.currentItem = this.currentItem as IPrestataire;
        break;
      case EndSheetLabel.INSURANCE:
        this.currentItem = this.currentItem as IAssurance;
        break;
      case EndSheetLabel.CASHIER:
        this.currentItem = this.currentItem as ICashier;
        break;
      default: break;
    }
  }

  handleClick(label: string, action: string) {
    this.event.emit({ label: label, action: action, item: this.currentItem });
  }
}