/**
 * Operation to sum two Long Count Dates
 */
import LongCount from "../lc/long-count";
import LongcountOperation from "./longcount-operation";

export default class LongcountAddition extends LongcountOperation {

  /**
   * Return the sum result of this Addition operator.
   * @return {LongCount}
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
      const monthLength = (i === 1) ? 15 : 20;
      if (newParts[i] >= monthLength) {
        const positionValue = newParts[i] % monthLength;
        carry = Math.floor(newParts[i] / monthLength);
        newParts[i] = positionValue;
      }
      i += 1;
    }
    return new this.LcClass(...newParts);
  }

  equal(other: any): boolean {
    if (other instanceof LongcountAddition) {
      return this.a.equal(other.a) && this.b.equal(other.b)
    }
    return false
  }
}


