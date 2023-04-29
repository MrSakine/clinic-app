import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ChooseServiceDialogData } from 'src/app/core/_dialog-data/choose-service-dialog-data';
import { ICashier } from 'src/app/core/_interfaces/icashier';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { ChooseServiceDialogComponent } from './choose-service-dialog/choose-service-dialog.component';

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

  openChooseServiceDialog() {
    let data = this.prepareDialogData("35%");
    this.ref = this.matDialog.open(ChooseServiceDialogComponent, data);
    this.ref.afterClosed().subscribe(val => this.handleSSPAdded(val));
  }

  prepareDialogData(width: string): MatDialogConfig {
    let config = new MatDialogConfig();
    let data = new ChooseServiceDialogData();

    config.width = width;
    data.services = this.services;
    data.serviceProviders = this.serviceProviders;

    config.data = data;

    return config;
  }

  handleSSPAdded(val: any) { }

}