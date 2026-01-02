/**
 * Operation to subtract one {@link LongCount} from another.
 */
import LongCount from "../lc/long-count";
import LongcountOperation from "./longcount-operation";
import {IPart} from "../i-part";

export default class LongcountSubtraction extends LongcountOperation {

  /**
   * Calculate the resulting {@link LongCount} difference.
   */
  equals(): IPart {
    const [aParts, bParts, isInverted] = this.buildOperationComponents()

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
        // Per spec [R1, R2]: 1 tun = 18 winal (not 15!)
        // Position 0 = k'in (base 20), Position 1 = winal (base 18), Position 2+ = base 20
        const nextPositionBase = (i === 1) ? 18 : 20;
        newParts[i] += nextPositionBase;
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

  equal(other: unknown): boolean {
    if (other instanceof LongcountSubtraction) {
      return this.a.equal(other.a) && this.b.equal(other.b)
    }
    return false;
  }
}
