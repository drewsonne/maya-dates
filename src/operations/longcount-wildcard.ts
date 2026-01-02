import LongCount from "../lc/long-count";
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";

/**
 * Expand a {@link LongCount} containing wildcards into all valid dates.
 */
export default class LongCountWildcard extends CommentWrapper implements IPart {
  private readonly lc: LongCount;

  /**
   * @param lc - Partial Long Count to expand.
   */
  constructor(lc: LongCount) {
    super();
    this.lc = lc;
  }

  equal(other: IPart): boolean {
    if (other instanceof LongCountWildcard) {
      return this.lc.equal(other.lc)
    }
    return false
  }

  /**
   * Generate all fully qualified Long Counts matching the pattern.
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
