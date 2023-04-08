import { IPrestataire } from "../_interfaces/iprestataire";
import { BaseDialogData } from "./base-dialog-data";

export class ServiceProviderDialogData extends BaseDialogData {
    currentServiceProvider?: IPrestataire;
}
