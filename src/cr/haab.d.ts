import { HaabMonth } from "./component/haabMonth";
import Coefficient from "./component/coefficient";
import { Wildcard } from "../wildcard";
export declare function getHaab(coeff: Coefficient | Wildcard, month: Wildcard | HaabMonth): Haab;
export declare class Haab {
    coeff: Coefficient;
    month: Wildcard | HaabMonth;
    privateNext: Haab;
    constructor(coeff: Coefficient, month: Wildcard | HaabMonth);
    validate(): boolean;
    next(): Haab;
    equal(otherHaab: Haab): boolean;
    match(otherHaab: Haab): boolean;
    get name(): string;
    shift(numDays: number): Haab;
    get coeffValue(): Wildcard | number;
    toString(): string;
}
