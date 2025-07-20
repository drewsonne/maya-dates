import Factory from './base';
import LongCount from '../lc/long-count';
import {Wildcard} from '../wildcard';

/**
 * Parses textual representations of Long Count dates.
 *
 * @example
 * ```typescript
 * const lc = new LongCountFactory().parse('9.4.2.4.1');
 * ```
 */
export default class LongCountFactory extends Factory {
  constructor() {
    super(/(?:(?:\*|(?:[\d]{1,2}))\.){1,}(?:(?:\*)|(?:[\d]{1,2}))/);
  }

  /**
   * Parse a textual Long Count value.
   *
   * @param raw - String containing the Long Count.
   * @returns Parsed {@link LongCount} instance.
   */
  parse(raw: string): LongCount {
    const dates = raw.match(this.pattern);
    if (dates === null || dates.length !== 1) {
      throw new Error("Could not match Long Count")
    }

    const parts = dates[0].split('.');

    return new LongCount(
      ...new Array(Math.max(5 - parts.length, 0))
        .fill('0')
        .concat(parts)
        .map(
          (part) => ((part === '*') ? new Wildcard() : parseInt(part, 10))
        )
        .reverse()
    );
  }
}
