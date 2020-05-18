import { TzolkinDay } from "./component/tzolkinDay";
import Coefficient from "./component/coefficient";
import { Wildcard } from "../wildcard";
export declare function getTzolkin(coeff: number | Wildcard, day: TzolkinDay): Tzolkin;
export declare class Tzolkin {
    day: TzolkinDay;
    coeff: Coefficient;
    privateNext: Tzolkin;
    constructor(newCoeff: number | Wildcard, newDay: TzolkinDay);
    next(): Tzolkin;
    validate(): boolean;
    shift(newIncremental: number): Tzolkin;
    equal(newTzolkin: any): boolean;
    match(newTzolkin: any): boolean;
    get name(): string | Wildcard;
    toString(): string;
}
