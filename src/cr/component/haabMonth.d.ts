import { Cycle } from "./cycle";
import { Wildcard } from "../../wildcard";
export declare const getHaabMonth: (cycleName: any) => HaabMonth;
export declare class HaabMonth extends Cycle<HaabMonth> {
    constructor(raw: string | Wildcard);
    validate(): boolean;
}
