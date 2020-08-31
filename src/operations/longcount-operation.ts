import {CommentWrapper} from "../comment-wrapper";
import {IPart} from "../i-part";
import DistanceNumber from "../lc/distance-number";
import ILongcount from "./ILongcount";
import {Wildcard} from "../wildcard";

export default abstract class LongcountOperation extends CommentWrapper implements IPart {
  abstract equal(other: any): boolean;

  protected readonly a: DistanceNumber
  protected readonly b: DistanceNumber
  protected readonly LcClass: ILongcount

  /**
   * @param {object} lcClass - Special param to pass the LongCount class into this operator to
   * avoid circular require.
   * @param {LongCount} a - First date to diff
   * @param {LongCount} b - Second date to diff
   */
  constructor(lcClass: ILongcount, a: DistanceNumber, b: DistanceNumber) {
    super();
    this.a = a;
    this.b = b;
    this.LcClass = lcClass;
  }

  protected buildOperationComponents(): [(number | Wildcard)[], (number | Wildcard)[], boolean] {
    const aLen = this.a.parts.length;
    const bLen = this.b.parts.length;
    const length = Math.max(aLen, bLen);
    const aParts = this.a.parts.concat(new Array(length - aLen).fill(0));
    const bParts = this.b.parts.concat(new Array(length - bLen).fill(0));
    const isInverted = this.a.lt(this.b);

    return [aParts, bParts, isInverted]
  }
}
