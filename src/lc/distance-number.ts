/**
 * Long Count cycle
 */
import {isWildcard, Wildcard} from "../wildcard";
import LongcountAddition from "../operations/longcount-addition";
import LongcountSubtraction from "../operations/longcount-subtraction";
import {IPart} from "../i-part";
import {CommentWrapper} from "../comment-wrapper";

export default class DistanceNumber extends CommentWrapper implements IPart {
  parts: (number | Wildcard)[];
  datePattern: RegExp;
  sign: number;

  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor(...cycles: (number | Wildcard)[]) {
    super();
    /**
     * Date Components
     */
    this.parts = cycles;

    /**
     * Pattern to validate the fullDate
     * @type {RegExp}
     */
    this.datePattern = /([\d*]+\.?)+/;

    /**
     * @private
     * @type {number}
     */
    this.sign = (this.parts[this.parts.length - 1] < 0) ? -1 : 1;
    if (this.isNegative) {
      let lastComponent = this.parts[this.parts.length - 1]
      if (typeof lastComponent === 'number') {
        this.parts[this.parts.length - 1] = -1 * lastComponent
      } else {
        throw new Error("Last component is not a number")
      }
    }
  }

  /**
   * Return true if the Long Count is positive.
   * @return {boolean}
   */
  get isPositive(): boolean {
    return this.sign === 1;
  }

  /**
   * Return true if the Long Count is operating as a negative Distance Number.
   * @return {boolean}
   */
  get isNegative(): boolean {
    return this.sign === -1;
  }

  /**
   * Set this Long Count as being a Long Count or a positive Distance Number
   * @param {boolean} newPositive
   */
  set isPositive(newPositive: boolean) {
    this.sign = newPositive ? 1 : -1;
  }

  /**
   * Set this Long Count as being a negative Distance Number
   * @param newNegative
   */
  set isNegative(newNegative: boolean) {
    this.isPositive = !newNegative;
  }

  /**
   * Given two long count dates, check if they are equal
   * @param {DistanceNumber} other
   * @return {boolean}
   */
  equal(other: IPart): boolean {
    if (other instanceof DistanceNumber) {
      const thisMinParts = this.sigParts;
      const otherMinParts = other.sigParts;

      const signEqual = this.sign === other.sign;
      const lengthEqual = thisMinParts.length === otherMinParts.length;
      const partsEqual: boolean[] = thisMinParts.map((e, i) => {
        return isWildcard(e) ? isWildcard(otherMinParts[i]) : e === otherMinParts[i]
      });
      const everyPartEqual = partsEqual.every((p) => p)

      return signEqual && lengthEqual && everyPartEqual;
    }
    return false;
  }

  /**
   * Given two long count dates, check if they are exactly equal
   * @param {DistanceNumber} other
   * @return {boolean}
   */
  exactlyEqual(other: DistanceNumber): boolean {
    const signsEqual = (this.sign === other.sign);
    const lengthEqual = (this.parts.length === other.parts.length);
    const partsEqual = this.parts.every((e, i) => {
      return isWildcard(e) ? isWildcard(other.parts[i]) : e === other.parts[i]
    });
    return signsEqual && lengthEqual && partsEqual;
  }

  /**
   * Only digits in the LC with significant digits
   * @return {number[]|Wildcard[]}
   */
  get sigParts(): (number | Wildcard)[] {
    let sigParts = [];
    for (let i = 0; i < this.parts.length; i++) {
      if (this.parts[i] === 0) {
        i = this.parts.length;
      } else {
        sigParts.push(this.parts[i]);
      }
    }
    return sigParts;
  }

  /**
   * Create a copy object of this long count fullDate
   * @returns {DistanceNumber}
   */
  clone(): DistanceNumber {
    return new DistanceNumber(...this.parts);
  }

  /**
   * Get specific column in Long Count fullDate
   * @param {number} index
   * @returns {number}
   */
  getDateSections(index: number): number | Wildcard {
    const part = this.parts[index];
    if (part === undefined) {
      return 0;
    }
    return part;
  }

  /**
   * Set specific column in Long Count fullDate
   * @param {number} index
   * @param {number|wildcard} newValue
   * @returns {DistanceNumber}
   */
  setDateSections(index: number, newValue: number | Wildcard) {
    this.parts[index] = newValue;
    return this;
  }

  /**
   * Pass the map down to the parts
   * @param fn
   * @return {object[]}
   */
  map(fn: (lcPart: (number | Wildcard), lcPartIndex: number) => any): any[] {
    return this.parts.map(fn);
  }

  /**
   * Compare if this LC is greater than the supplied LC.
   * @param {DistanceNumber} newLongCount
   * @return {boolean}
   */
  lt(newLongCount: DistanceNumber): boolean {
    return this.getPosition() < newLongCount.getPosition();
  }

  /**
   * Compare is this LC is less than the supplied LC.
   * @param {DistanceNumber} newLongCount
   * @return {boolean}
   */
  gt(newLongCount: DistanceNumber): boolean {
    return this.getPosition() > newLongCount.getPosition();
  }

  /**
   * Set the k'in component of the fullDate
   */
  set kIn(newKIn: number | Wildcard) {
    this.setDateSections(0, newKIn);
  }

  /**
   * Return the k'in component of the fullDate
   * @returns {number}
   */
  get kIn(): number | Wildcard {
    return this.getDateSections(0);
  }

  /**
   * Set the winal component of the fullDate
   */
  set winal(newWinal: number | Wildcard) {
    this.setDateSections(1, newWinal);
  }

  /**
   * Return the winal component of the fullDate
   * @returns {number}
   */
  get winal(): number | Wildcard {
    return this.getDateSections(1);
  }

  /**
   * Set the tun component of the fullDate
   */
  set tun(newTun: number | Wildcard) {
    this.setDateSections(2, newTun);
  }

  /**
   * Return the tun component of the fullDate
   * @returns {number}
   */
  get tun(): number | Wildcard {
    return this.getDateSections(2);
  }

  /**
   * Set the k'atun component of the fullDate
   */
  set kAtun(newKAtun: number | Wildcard) {
    this.setDateSections(3, newKAtun);
  }

  /**
   * Return the k'atun component of the fullDate
   * @returns {number}
   */
  get kAtun(): number | Wildcard {
    return this.getDateSections(3);
  }

  /**
   * Set the bak'tun component of the fullDate
   */
  set bakTun(newBakTun: number | Wildcard) {
    this.setDateSections(4, newBakTun);
  }

  /**
   * Return the bak'tun component of the fullDate
   * @returns {number}
   */
  get bakTun(): number | Wildcard {
    return this.getDateSections(4);
  }

  /**
   * Set the piktun component of the fullDate
   */
  set piktun(newBakTun: number | Wildcard) {
    this.setDateSections(5, newBakTun);
  }

  /**
   * Return the piktun component of the fullDate
   * @returns {number}
   */
  get piktun(): number | Wildcard {
    return this.getDateSections(5);
  }

  /**
   * Set the kalabtun component of the fullDate
   */
  set kalabtun(newBakTun: number | Wildcard) {
    this.setDateSections(6, newBakTun);
  }

  /**
   * Return the kalabtun component of the fullDate
   * @returns {number}
   */
  get kalabtun(): number | Wildcard {
    return this.getDateSections(6);
  }

  /**
   * Set the kinchiltun component of the fullDate
   */
  set kinchiltun(newBakTun: number | Wildcard) {
    this.setDateSections(7, newBakTun);
  }

  /**
   * Return the kinchiltun component of the fullDate
   * @returns {number}
   */
  get kinchiltun(): number | Wildcard {
    return this.getDateSections(7);
  }

  /**
   * Ensure the fullDate has only numbers and wildcards separated by points.
   * @returns {boolean}
   */
  isValid(): boolean {
    return this.datePattern.test(this.toString());
  }

  /**
   * Returns true if any of the positions in the Long Count have been assigned
   * a {Wildcard} object.
   * @return {boolean}
   */
  isPartial(): boolean {
    return this.parts.some((part) => part instanceof Wildcard);
  }

  /**
   * Count the number of days since 0.0.0.0.0 for this LC.
   * @return {number}
   */
  getPosition() {
    if (this.isPartial()) {
      throw new Error('Can not get position of fullDate dates');
    }
    let total = 0
    if (!isWildcard(this.kIn)) {
      total += this.kIn
    }
    if (!isWildcard(this.winal)) {
      total += this.winal * 20
    }
    if (!isWildcard(this.tun)) {
      total += this.tun * 360
    }
    if (!isWildcard(this.kAtun)) {
      total += this.kAtun * 7200
    }
    if (!isWildcard(this.bakTun)) {
      total += this.bakTun * 144000
    }
    if (!isWildcard(this.piktun)) {
      total += this.piktun * 2880000
    }
    if (!isWildcard(this.kalabtun)) {
      total += this.kalabtun * 57600000
    }
    if (!isWildcard(this.kinchiltun)) {
      total += this.kinchiltun * 1152000000
    }
    return total * this.sign;
  }

  /**
   * Return the sum of this Long Count and the supplied
   * @param {DistanceNumber} newLc
   * @return {LongcountAddition}
   */
  plus(newLc: DistanceNumber): LongcountAddition {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountAddition(DistanceNumber, this, newLc);
  }

  /**
   * Return the difference between this Long Count and the supplied
   * @param {DistanceNumber} newLc
   * @return {LongcountAddition}
   */
  minus(newLc: DistanceNumber): LongcountSubtraction {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountSubtraction(DistanceNumber, this, newLc);
  }

  /**
   * Make sure the elements of the Long Count do not exceed
   * @return {DistanceNumber}
   */
  normalise(): DistanceNumber {
    const totalKIn = this.getPosition();
    const norm = new DistanceNumber();
    norm.kIn = totalKIn % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.winal = (totalKIn - norm.getPosition()) / 20 % 18;
    // eslint-disable-next-line no-mixed-operators
    norm.tun = (totalKIn - norm.getPosition()) / 360 % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.kAtun = (totalKIn - norm.getPosition()) / 7200 % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.bakTun = (totalKIn - norm.getPosition()) / 144000 % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.piktun = (totalKIn - norm.getPosition()) / 2880000 % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.kalabtun = (totalKIn - norm.getPosition()) / 57600000 % 20;
    // eslint-disable-next-line no-mixed-operators
    norm.kinchiltun = (totalKIn - norm.getPosition()) / 1152000000 % 20;
    const foundNegative = norm.parts.reduce(
      (found, part) => found || (part < 0),
      false,
    );
    this.sign = foundNegative ? -1 : 1;
    this.parts = norm.parts.map((part) => {
      if (typeof part === 'number') {
        return Math.abs(part)
      } else {
        throw new Error("part is not number")
      }
    });
    return this;
  }

  /**
   * Convert the LongCount to a string and pad the sections of the fullDate
   * @returns {string}
   */
  toString(): string {
    let significantDigits: (number | Wildcard)[] = [];
    for (let i = this.parts.length - 1; i >= 0; i -= 1) {
      const part = this.parts[i];
      if (part !== 0) {
        significantDigits = this.parts.slice(0, i + 1).reverse();
        break;
      }
    }

    for (let i = 0; i < significantDigits.length; i += 1) {
      if (significantDigits[i] === undefined) {
        significantDigits[i] = 0;
      }
    }

    const dateLength = significantDigits.length;
    if (dateLength < 5) {
      significantDigits = significantDigits.reverse();
      for (let i = 0; i < 5 - dateLength; i += 1) {
        significantDigits.push(0);
      }
      significantDigits = significantDigits.reverse();
    }


    let stringSignificantDigits: string[] = new Array<string>(significantDigits.length)
    for (let i = 0; i < significantDigits.length; i += 1) {
      const part = significantDigits[i].toString();
      stringSignificantDigits[i] = (part.length < 2) ? ` ${part}` : `${part}`;
    }
    return `${this.sign === -1 ? '-' : ''}${stringSignificantDigits.join('.')}`;
  }
}
