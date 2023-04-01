import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoElementEvent } from 'src/app/core/_events/no-element-event';

@Component({
  selector: 'app-no-element',
  templateUrl: './no-element.component.html',
  styleUrls: ['./no-element.component.scss']
})

export class NoElementComponent implements OnInit {
  @Input() mode?: string = 'hide';
  @Input() icon!: string;
  @Input() title!: string;
  @Input() content!: string;
  @Input() button!: string;
  @Input() label!: string;

  @Output() addEvent: EventEmitter<NoElementEvent> = new EventEmitter<NoElementEvent>();

  constructor() { }

  ngOnInit(): void { }

  onClick() {
    this.addEvent.emit({ action: 'add', label: this.label });
  }

}
