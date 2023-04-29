import { ICashier } from "../_interfaces/icashier";
import { IPrestataire } from "../_interfaces/iprestataire";

export class Ssp {
    data!: Record<string, IPrestataire>;
    hasInsurance: boolean = false;
    cashier!: ICashier;
}
