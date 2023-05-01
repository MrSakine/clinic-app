import { ICash } from "./icash";
import { IIns } from "./iins";
import { IPat } from "./ipat";
import { ISsp } from "./issp";

export interface ITicket {
    _id: string;
    _rev: string;
    ssp: ISsp;
    ins?: IIns;
    pat: IPat;
    cash: ICash;
}