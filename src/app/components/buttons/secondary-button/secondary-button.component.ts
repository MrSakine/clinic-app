import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})

export class SecondaryButtonComponent implements OnInit {
  @Input() text!: string;
  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }
}
