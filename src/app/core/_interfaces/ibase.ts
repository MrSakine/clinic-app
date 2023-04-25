import { IPrestation } from './iprestation';
import { IAssurance } from './iassurance';
import { IInfo } from './iinfo';
import { IPrestataire } from './iprestataire';
import { ICashier } from './icashier';

export interface IBase {
    _id: string;
    _rev: string;
    services: IPrestation[];
    serviceProviders: IPrestataire[];
    insurances: IAssurance[];
    cashiers: ICashier[];
    infos: IInfo[];
}
