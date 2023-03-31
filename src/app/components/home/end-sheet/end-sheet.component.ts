import { Component, OnInit } from '@angular/core';
import { IPrestation } from 'src/app/core/_interfaces/iprestation';
import { IAssurance } from '../../../core/_interfaces/iassurance';
import { NoElementEvent } from 'src/app/core/_events/no-element-event';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { ServiceProviderDialogComponent } from './service-provider-dialog/service-provider-dialog.component';
import { InsuranceDialogComponent } from './insurance-dialog/insurance-dialog.component';
import { IPrestataire } from 'src/app/core/_interfaces/iprestataire';

interface Help {
  icon: string;
  title: string;
  content: string;
  button: string;
}

@Component({
  selector: 'app-end-sheet',
  templateUrl: './end-sheet.component.html',
  styleUrls: ['./end-sheet.component.scss']
})

export class EndSheetComponent implements OnInit {
  prestationHelp: Help = {
    icon: 'medication',
    title: 'Gérer vos prestations',
    content: 'Commencez à ajouter une prestation, elle sera enregistré ici. Revoyez, modifiez et supprimez-le quand vous le souhaitez',
    button: 'Ajouter une prestation'
  };
  prestataireHelp: Help = {
    icon: 'diversity_3',
    title: 'Gérer vos prestataires',
    content: 'Commencez à ajouter un prestatire, elle sera enregistré ici. Revoyez, modifiez et supprimez-le quand vous le souhaitez',
    button: 'Ajouter un prestatire'
  };
  insuranceHelp: Help = {
    icon: 'spa',
    title: 'Gérer vos assurances',
    content: 'Commencez à ajouter les assurances supportées par votre clinique',
    button: 'Ajouter une assurance'
  };

  ref!: MatDialogRef<ServiceDialogComponent | ServiceProviderDialogComponent | InsuranceDialogComponent>;

  constructor(
    private matDialog: MatDialog,
  ) { }

  onNoElementComponentAddClickEvent(event: NoElementEvent) {
    let action = event.action;
    let label = event.label;
    let whichLabel = this.findLabelByName(label);

    switch (whichLabel) {
      case 0x1:
        this.openServiceDialog(null);
        break;
      case 0x2:
        this.openServiceProviderDialog(null);
        break;
      case 0x3:
        this.openInsuranceDialog(null);
        break;
      default: break;
    }
  }

  ngOnInit(): void { }

  openServiceDialog(service: IPrestation | null | undefined) {
    let data = this.prepareDialogData("40%", null);
    this.ref = this.matDialog.open(ServiceDialogComponent, data);
  }

  openServiceProviderDialog(serviceProvider: IPrestataire | null | undefined) {
    let data = this.prepareDialogData("40%", null);
    this.ref = this.matDialog.open(ServiceProviderDialogComponent, data);
  }

  openInsuranceDialog(insurance: IAssurance | null | undefined) {
    let data = this.prepareDialogData("40%", null);
    this.ref = this.matDialog.open(InsuranceDialogComponent, data);
  }

  prepareDialogData(width: string, obj: IPrestation | IAssurance | null | undefined): MatDialogConfig {
    let config = new MatDialogConfig();
    let elementRef = document.getElementById('app-right-sheet');
    config.width = width;

    return config;
  }

  findActionByName(action: string) { }

  findLabelByName(name: string): number {
    let n = 0x0;

    switch (name) {
      case 'pres':
        n = 0x1;
        break;
      case 'prest':
        n = 0x2;
        break;
      case 'ins':
        n = 0x3;
        break;
      default: break;
    }

    return n;
  }
}
