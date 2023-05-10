import { IPrestation } from "./iprestation";

export interface IPrestataire {
    id?: number;
    name: string;
    surname: string;
    service: IPrestation[];
}
