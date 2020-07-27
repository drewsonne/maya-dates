import { Cycle } from "./cycle";
import { Wildcard } from "../../wildcard";
export declare const getTzolkinDay: (cycleName: string | number | Wildcard) => TzolkinDay | Wildcard;
export declare class TzolkinDay extends Cycle<(TzolkinDay | Wildcard)> {
    value: string | Wildcard;
    constructor(newName: number | string | Wildcard);
    validate(): boolean;
}
