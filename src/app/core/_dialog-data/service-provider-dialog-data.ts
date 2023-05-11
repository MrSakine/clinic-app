import { IPrestataire } from "../_interfaces/iprestataire";
import { IPrestation } from "../_interfaces/iprestation";
import { BaseDialogData } from "./base-dialog-data";

export class ServiceProviderDialogData extends BaseDialogData {
    currentServiceProvider?: IPrestataire;
    services?: IPrestation[];
}
