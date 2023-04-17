import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {
  showSwitcher: boolean = false;
  @Output() showMenu: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  startupMenuEvent(e: any) {
    this.showMenu.emit(e);
  }
}