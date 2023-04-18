import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit, OnChanges {
  showSwitcher: boolean = false;
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() cashiers!: ICashier[];
  @Output() showMenu: EventEmitter<any> = new EventEmitter();

  constructor() { }

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

  onInputChange(changes: SimpleChanges) {
    this.services = changes['services'].currentValue;
    this.serviceProviders = changes['serviceProviders'].currentValue;
    this.cashiers = changes['cashiers'].currentValue;

    this.handleSwitcher();
  }
}