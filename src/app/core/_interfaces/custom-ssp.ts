import { IPrestataire } from "./iprestataire";
import { IPrestation } from "./iprestation";

export interface CustomSSP {
    id: number,
    service: IPrestation,
    serviceProvider: IPrestataire
}
