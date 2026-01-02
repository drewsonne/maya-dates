import WildcardCoefficient from "./wildcardCoefficient";
import ICoefficient from "./iCoefficient";

export default class NumberCoefficient implements ICoefficient {

  value: number

  constructor(coefficient: number) {
    this.value = coefficient
  }

  isWildcard(): boolean {
    return false;
  }

  /**
   * Validate the coefficient value. Override in context-specific usage.
   * By default, no validation is performed - specific calendar contexts
   * (Tzolk'in, Haab', etc.) should provide their own validation.
   * @return {boolean} Always returns true in base implementation
   */
  validate(): boolean {
    return true;
  }

  increment(): NumberCoefficient {
    return new NumberCoefficient(this.value + 1)
  }

  isIn(validHaabCoeffs: number[]): Boolean {
    return validHaabCoeffs.includes(this.value);
  }

  toString() {
    return `${this.value}`
  }

  equal(coefficient: ICoefficient): Boolean {
    if (coefficient instanceof WildcardCoefficient) {
      return false
    }
    return `${this}` === `${coefficient}`
  }

  match(coefficient: ICoefficient): Boolean {
    if (coefficient instanceof WildcardCoefficient) {
      return true
    }
    if (coefficient instanceof NumberCoefficient) {
      return this.value == coefficient.value
    }
    throw new Error("Unexpected coefficient type")
  }
}
