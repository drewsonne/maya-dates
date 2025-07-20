/**
 * Marker value used when portions of a date are unknown.
 *
 * @example
 * ```typescript
 * import { CalendarRoundFactory, Wildcard } from '@drewsonne/maya-dates';
 * const cr = new CalendarRoundFactory().parse('4 Ajaw 8 *');
 * console.log(cr.haab.month.equal(new Wildcard())); // true
 * ```
 */
import {IPart} from "./i-part";
import {CommentWrapper} from "./comment-wrapper";

export class Wildcard extends CommentWrapper implements IPart {

  constructor() {
    super();
  }

  /**
   * Render the wildcard as the character `*`.
   */
  toString(): string {
    return '*';
  }

  equal(other: IPart): boolean {
    return isWildcard(other)  }
}

export function isWildcard(token: any): token is Wildcard {
  return token instanceof Wildcard;
}

