import { IPrestation } from "../_interfaces/iprestation";
import { Base } from "./base";

export class ServiceProvider extends Base {
    id?: number;
    firstname!: string;
    lastname!: string;
    service!: IPrestation[];
}
