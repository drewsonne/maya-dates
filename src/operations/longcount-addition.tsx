/**
 * Operation to sum two Long Count Dates
 */
class LongcountAddition {
  /**
   * @param {object} lcClass - Special param to pass the LongCount class into this operator to
   * avoid circular require.
   * @param {LongCount} a - First date to sum
   * @param {LongCount} b - Second date to sum
   */
  constructor(lcClass, a, b) {
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
   * Return the sum result of this Addition operator.
   * @return {LongCount}
   */
  equals() {
    const aLen = this.a.parts.length;
    const bLen = this.b.parts.length;
    const length = Math.max(aLen, bLen);
    const aParts = this.a.parts.concat(new Array(length - aLen).fill(0));
    const bParts = this.b.parts.concat(new Array(length - bLen).fill(0));

    const newParts = aParts.map((p, i) => p + bParts[i]);

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
}

module.exports = LongcountAddition;
