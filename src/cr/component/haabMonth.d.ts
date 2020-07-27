import { Cycle } from "./cycle";
import { Wildcard } from "../../wildcard";
export declare const getHaabMonth: (cycleName: string | number | Wildcard) => HaabMonth | Wildcard;
export declare class HaabMonth extends Cycle<(HaabMonth | Wildcard)> {
    constructor(raw: string | Wildcard);
    validate(): boolean;
}
