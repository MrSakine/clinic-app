import { ICashier } from "../_interfaces/icashier";
import { BaseDialogData } from "./base-dialog-data";

export class CashierDialogData extends BaseDialogData {
    currentCashier?: ICashier;
}
