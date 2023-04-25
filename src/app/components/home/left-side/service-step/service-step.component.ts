import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';

@Component({
  selector: 'app-service-step',
  templateUrl: './service-step.component.html',
  styleUrls: ['./service-step.component.scss']
})

export class ServiceStepComponent implements OnInit {
  ref!: MatDialogRef<any>;
  @Input() services!: IPrestation[];
  @Input() serviceProviders!: IPrestataire[];
  @Input() cashiers!: ICashier[];

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void { }

  openChooseServiceDialog() { }

  prepareDialogData() { }

}