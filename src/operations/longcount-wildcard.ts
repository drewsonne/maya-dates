import {Wildcard} from '../wildcard';
import LongCount from "../lc/long-count";

/**
 * Given a Long Count with a wildcard, calculate all possible matching fully
 * qualified Long Counts.
 */
export default class LongCountWildcard {
  private lc: LongCount;

  /**
   * @param {LongCount} lc
   */
  constructor(lc: LongCount) {
    /**
     * @type {LongCount}
     */
    this.lc = lc;
  }

  /**
   * Run calculation to find all fully qualified Long Counts
   * @return {LongCount[]}
   */
  run(): LongCount[] {
    return this.lc.map(
      (part, i) => ((part instanceof Wildcard) ? i : false)
    ).filter((i) => i !== false).reduce(
      (potentials, position) => potentials.reduce(
        (acc: LongCount[], possible: LongCount) => new Array(
          (position === 1) ? 15 : 20
        ).fill().map(
          (_: any, i: number) => possible.clone().setDateSections(position, i)
        ).concat(acc),
        []
      ),
      [this.lc]
    );
  }
}
