/** @ignore */
const wildcard = require('../wildcard');

/**
 * Given a Long Count with a wildcard, calculate all possible matching fully
 * qualified Long Counts.
 */
class LongCountWildcard {
  /**
   * @param {LongCount} lc
   */
  constructor(lc) {
    /**
     * @type {LongCount}
     */
    this.lc = lc;
  }

  /**
   * Run calculation to find all fully qualified Long Counts
   * @return {LongCount[]}
   */
  run() {
    const wcIndexes = this.lc.map(
      (part, i) => ((part === wildcard) ? i : false),
    );

    const filteredWcIndexes = wcIndexes.filter(
      (i) => i !== false,
    );

    return filteredWcIndexes.reduce(
      function (potentials, position) {
        const a = potentials.reduce(
          function (acc, possible) {
            const dayMonths = new Array((position === 1) ? 15 : 20);
            const filledDayMonths = dayMonths.fill();
            const b = filledDayMonths.map(function (_, i) {
              const clone = possible.clone();
              const adjusted = clone.setDateSections(position, i);
              return adjusted;
            }).concat(acc);
            return b;
          },
          [],
        );
        return a;
      },
      [this.lc],
    );
  }
}

module.exports = LongCountWildcard;
