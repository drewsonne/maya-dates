import LongCount from "../lc/long-count";
import IPart from "../i-part";

/**
 * Given a Long Count with a wildcard, calculate all possible matching fully
 * qualified Long Counts.
 */
export default class LongCountWildcard implements IPart {
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

  equal(other: IPart): boolean {
    if (other instanceof LongCountWildcard) {
      return other.lc.equal(other.lc)
    }
    return false
  }

  /**
   * Run calculation to find all fully qualified Long Counts
   * @return {LongCount[]}
   */
  run(): LongCount[] {
    return this.lc.map(
      (part, i) => (typeof part === 'number' ? false : i)
    ).filter((i) => i !== false).reduce(
      (potentials, position) => {
        return potentials.reduce(
          (acc: LongCount[], possible: LongCount) => {
            let arrayResult = new Array(
              (position === 1) ? 15 : 20
            )
            let fillResult = arrayResult.fill(undefined)
            let result = fillResult.map(
              (_: any, i: number) => possible.clone().setDateSections(position, i)
            ).concat(acc)
            return result
          }, []
        )

      },
      [this.lc]
    );
  }
}
