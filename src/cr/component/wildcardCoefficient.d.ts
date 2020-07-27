import { Wildcard } from "../../wildcard";
export default class WildcardCoefficient extends Wildcard implements ICoefficient {
    isWildcard(): boolean;
    isIn(validHaabCoeffs: number[]): Boolean;
    validate(): boolean;
    toString(): string;
    equal(coefficient: ICoefficient): Boolean;
    match(coefficient: ICoefficient): Boolean;
}
