import {Wildcard} from "../../wildcard";

export default class WildcardCoefficient extends Wildcard implements ICoefficient {
  isWildcard(): boolean {
    return true;
  }

  isIn(validHaabCoeffs: number[]): Boolean {
    return true;
  }

  validate(): boolean {
    return true;
  }

  toString(): string {
    return '*'
  }

  equal(coefficient: ICoefficient): Boolean {
    return coefficient instanceof WildcardCoefficient;
  }

  match(coefficient: ICoefficient): Boolean {
    return true;
  }
}
