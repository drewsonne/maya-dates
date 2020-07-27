export default class NumberCoefficient implements ICoefficient {
    value: number;
    constructor(coefficient: number);
    isWildcard(): boolean;
    validate(): boolean;
    increment(): NumberCoefficient;
    isIn(validHaabCoeffs: number[]): Boolean;
    toString(): string;
    equal(coefficient: ICoefficient): Boolean;
    match(coefficient: ICoefficient): Boolean;
}
