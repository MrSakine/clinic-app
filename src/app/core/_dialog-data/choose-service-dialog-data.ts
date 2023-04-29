import { IPrestataire } from "../_interfaces/iprestataire";
import { IPrestation } from "../_interfaces/iprestation";

export class ChooseServiceDialogData {
    services!: IPrestation[];
    serviceProviders!: IPrestataire[];
}
