/**
 * Operation to diff two Long Count Dates
 */
import ILongcount from "./ILongcount";
import LongCount from "../lc/long-count";
import DistanceNumber from "../lc/distance-number";
import IPart from "../i-part";

export default class LongcountSubtraction implements IPart {
  private a: DistanceNumber
  private b: DistanceNumber
  private LcClass: ILongcount

  /**
   * @param {object} lcClass - Special param to pass the LongCount class into this operator to
   * avoid circular require.
   * @param {LongCount} a - First date to diff
   * @param {LongCount} b - Second date to diff
   */
  constructor(lcClass: ILongcount, a: DistanceNumber, b: DistanceNumber) {
    /**
     * @type {LongCount}
     */
    this.a = a;

    /**
     * @type {LongCount}
     */
    this.b = b;

    /** @ignore */
    this.LcClass = lcClass;
  }

  /**
   * Return the diff result of this Subtraction operator.
   * @return {LongCount}
   */
  equals() {
    const aLen = this.a.parts.length;
    const bLen = this.b.parts.length;
    const length = Math.max(aLen, bLen);
    const aParts = this.a.parts.concat(new Array(length - aLen).fill(0));
    const bParts = this.b.parts.concat(new Array(length - bLen).fill(0));
    const isInverted = this.a.lt(this.b);

    const newParts = aParts.map((p, i) => {
      const bPart = bParts[i]
      if (typeof p === 'number') {
        if (typeof bPart === 'number') {
          return (isInverted ? (bPart - p) : (p - bPart))
        } else {
          throw new Error("'bPart' is not a number")
        }
      } else {
        throw new Error("'p' is not a number")
      }
    });

    let carry = 0;
    let i = 0;
    while (i < newParts.length || carry < 0) {
      newParts[i] += carry;
      carry = 0;
      while (newParts[i] < 0) {
        carry -= 1;
        const nextPositionMonthLength = (i === 1) ? 15 : 20;
        newParts[i] += nextPositionMonthLength;
      }
      i += 1;
    }

    for (i = newParts.length - 1; i > 0; i -= 1) {
      if (newParts[i] === 0) {
        newParts.pop();
      } else {
        i = 0;
      }
    }
    const newLC = new this.LcClass(...newParts);
    newLC.isPositive = !isInverted;
    return newLC;
  }

  equal(other: IPart): boolean {
    if (other instanceof LongcountSubtraction) {
      return this.a.equal(other.a) && this.b.equal(other.b)
    }
    return false;
  }
}
