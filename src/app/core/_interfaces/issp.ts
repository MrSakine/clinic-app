import { ICashier } from "./icashier";
import { IPrestataire } from "./iprestataire";

export interface ISsp {
    data: Array<Record<string, IPrestataire>>;
    hasInsurance: boolean;
    cashier: ICashier;
}