import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-startup-step',
  templateUrl: './startup-step.component.html',
  styleUrls: ['./startup-step.component.scss']
})

export class StartupStepComponent implements OnInit {
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick() {
    this.buttonClick.emit(true);
  }

}