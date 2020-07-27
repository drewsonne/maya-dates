import { HaabMonth } from "./component/haabMonth";
import { Wildcard } from "../wildcard";
export declare function getHaab(coeff: ICoefficient, month: Wildcard | HaabMonth): Haab;
export declare class Haab {
    coeff: ICoefficient;
    month: Wildcard | HaabMonth;
    privateNext: Haab;
    constructor(coeff: ICoefficient, month: Wildcard | HaabMonth);
    validate(): boolean;
    next(): Haab;
    equal(otherHaab: Haab): boolean;
    match(otherHaab: Haab): boolean;
    get name(): string;
    shift(numDays: number): Haab;
    get coeffValue(): Wildcard | number;
    toString(): string;
}
