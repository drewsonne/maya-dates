import wildcard from '../wildcard';

/**
 * Given a Long Count with a wildcard, calculate all possible matching fully
 * qualified Long Counts.
 */
export default class LongCountWildcard {
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
    return this.lc.map(
      (part, i) => ((part === wildcard) ? i : false)
    ).filter(
      (i) => i !== false
    ).reduce(
      (potentials, position) => potentials.reduce(
        (acc, possible) => new Array(
          (position === 1) ? 15 : 20
        ).fill().map(
          (_, i) => possible.clone().setDateSections(position, i)
        ).concat(acc),
        []
      ),
      [this.lc]
    );
  }
}
