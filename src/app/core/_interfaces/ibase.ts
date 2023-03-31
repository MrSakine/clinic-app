import { IUser } from './iuser';
import { IPrestation } from './iprestation';
import { IAssurance } from './iassurance';
import { IInfo } from './iinfo';

export interface IBase {
    users: IUser[];
    prestations: IPrestation[];
    assurances: IAssurance[];
    infos: IInfo[];
}
