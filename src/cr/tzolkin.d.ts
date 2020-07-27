import { TzolkinDay } from "./component/tzolkinDay";
import { Wildcard } from "../wildcard";
export declare function getTzolkin(coeff: ICoefficient, day: TzolkinDay | Wildcard): Tzolkin;
export declare class Tzolkin {
    day: TzolkinDay | Wildcard;
    coeff: ICoefficient;
    privateNext: Tzolkin;
    constructor(newCoeff: ICoefficient, newDay: TzolkinDay | Wildcard);
    next(): Tzolkin;
    validate(): boolean;
    shift(newIncremental: number): Tzolkin;
    equal(newTzolkin: Tzolkin): boolean;
    match(newTzolkin: Tzolkin): boolean;
    get name(): string | Wildcard;
    toString(): string;
}
