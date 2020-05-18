import Wildcard from "../../wildcard";
import { Cycle } from "./cycle";
export declare const getTzolkinDay: (cycleName: any) => TzolkinDay;
export declare class TzolkinDay extends Cycle<TzolkinDay> {
    value: string | Wildcard;
    constructor(newName: number | string | Wildcard);
    validate(): boolean;
}
