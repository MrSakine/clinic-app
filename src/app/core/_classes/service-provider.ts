import { IPrestation } from "../_interfaces/iprestation";
import { Base } from "./base";

export class ServiceProvider extends Base {
    firstname!: string;
    lastname!: string;
    typeOfService!: IPrestation;
}
