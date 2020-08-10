import {Wildcard} from "../../wildcard";
import ICoefficient from "./iCoefficient";

export default class WildcardCoefficient implements ICoefficient {
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
