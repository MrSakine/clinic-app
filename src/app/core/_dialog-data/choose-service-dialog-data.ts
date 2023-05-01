import { CustomSSP } from "../_interfaces/custom-ssp";
import { IPrestataire } from "../_interfaces/iprestataire";
import { IPrestation } from "../_interfaces/iprestation";

export class ChooseServiceDialogData {
    services!: IPrestation[];
    serviceProviders!: IPrestataire[];
    currentSSP!: CustomSSP;
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
}
