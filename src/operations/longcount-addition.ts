/**
 * Operation to sum two {@link LongCount} dates.
 */
import LongCount from "../lc/long-count";
import LongcountOperation from "./longcount-operation";

export default class LongcountAddition extends LongcountOperation {

  /**
   * Calculate the resulting {@link LongCount}.
   */
  equals() {
    const [aParts, bParts, isInverted] = this.buildOperationComponents()

    const newParts = aParts.map((p, i) => {
      const bPart = bParts[i]
      if (typeof p === 'number') {
        if (typeof bPart === 'number') {
          return p + bPart
        } else {
          throw new Error("'bPart' is not a number")
        }
      } else {
        throw new Error("'p' is not a number")
      }

    });

    let carry = 0;
    let i = 0;
    while (i < newParts.length || carry > 0) {
      newParts[i] += carry;
      carry = 0;
      // Per spec [R1, R2]: 1 tun = 18 winal (not 15!)
      // Position 0 = k'in (base 20), Position 1 = winal (base 18), Position 2+ = base 20
      const positionBase = (i === 1) ? 18 : 20;
      if (newParts[i] >= positionBase) {
        const positionValue = newParts[i] % positionBase;
        carry = Math.floor(newParts[i] / positionBase);
        newParts[i] = positionValue;
      }
      i += 1;
    }
    return new this.LcClass(...newParts);
  }

  equal(other: unknown): boolean {
    if (other instanceof LongcountAddition) {
      return this.a.equal(other.a) && this.b.equal(other.b)
    }
    return false
  }
}


