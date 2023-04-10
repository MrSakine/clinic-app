import { Base } from "./base";

export class ServiceProvider extends Base {
    id?: number;
    firstname!: string;
    lastname!: string;
    service!: string;
}
