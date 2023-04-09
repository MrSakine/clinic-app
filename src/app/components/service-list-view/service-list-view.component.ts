import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EndSheetLabel } from 'src/app/core/_enums/end-sheet-label';
import { ExistElementEvent } from 'src/app/core/_events/exist-element-event';
import { NoElementEvent } from 'src/app/core/_events/no-element-event';
import { IAssurance } from 'src/app/core/_interfaces/iassurance';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';

@Component({
  selector: 'app-service-list-view',
  templateUrl: './service-list-view.component.html',
  styleUrls: ['./service-list-view.component.scss']
})

export class ServiceListViewComponent implements OnInit, OnChanges {
  @Input() data!: any[];
  @Input() label!: string;
  @Output() event: EventEmitter<ExistElementEvent> = new EventEmitter<ExistElementEvent>();
  @Output() addEvent: EventEmitter<NoElementEvent> = new EventEmitter<NoElementEvent>();

  currentItems!: any[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupData(changes['data'].currentValue);
  }

  ngOnInit(): void {
    this.setupData(this.data);
  }

  setupData(data: any[] | undefined) {
    let obj = null;

    if (!data) {
      obj = this.data
    } else {
      obj = data;
    }

    this.currentItems = obj;

    switch (this.label) {
      case EndSheetLabel.SERVICE:
        this.currentItems = this.currentItems as IPrestation[];
        break;
      case EndSheetLabel.SERVICE_PROVIDER:
        this.currentItems = this.currentItems as IPrestataire[];
        break;
      case EndSheetLabel.INSURANCE:
        this.currentItems = this.currentItems as IAssurance[];
        break;
      default: break;
    }
  }

  add() {
    this.addEvent.emit({ action: 'add', label: this.label });
  }

  handleEvent(e: ExistElementEvent) {
    this.event.emit(e);
  }
}
