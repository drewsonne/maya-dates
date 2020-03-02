/** @ignore */
const moonbeams = require('moonbeams')
/** @ignore */
const wildcard = require('../wildcard')
/** @ignore */
const LongcountAddition = require('../operations/longcount-addition')
/** @ignore */
const LongcountSubtraction = require('../operations/longcount-subtraction')

/**
 * Long Count cycle
 */
class DistanceNumber {
  /**
   * @param {...number|Wildcard} cycles - Components in the long count
   * (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor (...cycles) {
    /**
     * Date Components
     * @type {number[]|Wildcard[]}
     */
    this.parts = cycles

    /**
     * Pattern to validate the fullDate
     * @type {RegExp}
     */
    this.date_pattern = /([\d*]+\.?)+/

    /**
     * @private
     * @type {number}
     */
    this.sign = (this.parts[this.parts.length - 1] < 0) ? -1 : 1
    if (this.isNegative) {
      this.parts[this.parts.length - 1] = -1 *
        this.parts[this.parts.length - 1]
    }
  }

  /**
   * Return true if the Long Count is positive.
   * @return {boolean}
   */
  get isPositive () {
    return this.sign === 1
  }

  /**
   * Return true if the Long Count is operating as a negative Distance Number.
   * @return {boolean}
   */
  get isNegative () {
    return this.sign === -1
  }

  /**
   * Set this Long Count as being a Long Count or a positive Distance Number
   * @param {boolean} newPositive
   */
  set isPositive (newPositive) {
    this.sign = newPositive === true ? 1 : -1
  }

  /**
   * Set this Long Count as being a negative Distance Number
   * @param newNegative
   */
  set isNegative (newNegative) {
    this.isPositive = !newNegative
  }

  /**
   * Given two long count dates, check if they are equal
   * @param {DistanceNumber} other
   * @return {boolean}
   */
  equal (other) {
    return `${this}` === `${other}`
  }

  /**
   * Create a copy object of this long count fullDate
   * @returns {DistanceNumber}
   */
  clone () {
    return new DistanceNumber(...this.parts)
  }

  /**
   * Get specific column in Long Count fullDate
   * @param {number} index
   * @returns {number}
   */
  getDateSections (index) {
    const part = this.parts[index]
    if (part === undefined) {
      return 0
    }
    return part
  }

  /**
   * Set specific column in Long Count fullDate
   * @param {number} index
   * @param {number|wildcard} newValue
   * @returns {DistanceNumber}
   */
  setDateSections (index, newValue) {
    this.parts[index] = (newValue !== wildcard) ? newValue : parseInt(newValue,
      10)
    return this
  }

  /**
   * Pass the map down to the parts
   * @param fn
   * @return {object[]}
   */
  map (fn) {
    return this.parts.map(fn)
  }

  /**
   * Compare if this LC is greater than the supplied LC.
   * @param {DistanceNumber} newLongCount
   * @return {boolean}
   */
  lt (newLongCount) {
    return this.getPosition() < newLongCount.getPosition()
  }

  /**
   * Compare is this LC is less than the supplied LC.
   * @param {DistanceNumber} newLongCount
   * @return {boolean}
   */
  gt (newLongCount) {
    return this.getPosition() > newLongCount.getPosition()
  }

  /**
   * Set the k'in component of the fullDate
   */
  set kIn (newKIn) {
    this.setDateSections(0, newKIn)
  }

  /**
   * Return the k'in component of the fullDate
   * @returns {number}
   */
  get kIn () {
    return this.getDateSections(0)
  }

  /**
   * Set the winal component of the fullDate
   */
  set winal (newWinal) {
    this.setDateSections(1, newWinal)
  }

  /**
   * Return the winal component of the fullDate
   * @returns {number}
   */
  get winal () {
    return this.getDateSections(1)
  }

  /**
   * Set the tun component of the fullDate
   */
  set tun (newTun) {
    this.setDateSections(2, newTun)
  }

  /**
   * Return the tun component of the fullDate
   * @returns {number}
   */
  get tun () {
    return this.getDateSections(2)
  }

  /**
   * Set the k'atun component of the fullDate
   */
  set kAtun (newKAtun) {
    this.setDateSections(3, newKAtun)
  }

  /**
   * Return the k'atun component of the fullDate
   * @returns {number}
   */
  get kAtun () {
    return this.getDateSections(3)
  }

  /**
   * Set the bak'tun component of the fullDate
   */
  set bakTun (newBakTun) {
    this.setDateSections(4, newBakTun)
  }

  /**
   * Return the bak'tun component of the fullDate
   * @returns {number}
   */
  get bakTun () {
    return this.getDateSections(4)
  }

  /**
   * Set the piktun component of the fullDate
   */
  set piktun (newBakTun) {
    this.setDateSections(5, newBakTun)
  }

  /**
   * Return the piktun component of the fullDate
   * @returns {number}
   */
  get piktun () {
    return this.getDateSections(5)
  }

  /**
   * Set the kalabtun component of the fullDate
   */
  set kalabtun (newBakTun) {
    this.setDateSections(6, newBakTun)
  }

  /**
   * Return the kalabtun component of the fullDate
   * @returns {number}
   */
  get kalabtun () {
    return this.getDateSections(6)
  }

  /**
   * Set the kinchiltun component of the fullDate
   */
  set kinchiltun (newBakTun) {
    this.setDateSections(7, newBakTun)
  }

  /**
   * Return the kinchiltun component of the fullDate
   * @returns {number}
   */
  get kinchiltun () {
    return this.getDateSections(7)
  }

  /**
   * Ensure the fullDate has only numbers and wildcards separated by points.
   * @returns {boolean}
   */
  isValid () {
    return this.date_pattern.test(this.toString())
  }

  /**
   * Returns true if any of the positions in the Long Count have been assigned
   * a {Wildcard} object.
   * @return {boolean}
   */
  isPartial () {
    return this.parts.some((part) => part === wildcard)
  }

  /**
   * Count the number of days since 0.0.0.0.0 for this LC.
   * @return {number}
   */
  getPosition () {
    if (this.isPartial()) {
      throw new Error('Can not get position of fullDate dates')
    }
    return (this.kIn
      + this.winal * 20
      + this.tun * 360
      + this.kAtun * 7200
      + this.bakTun * 144000
      + this.piktun * 2880000
      + this.kalabtun * 57600000
      + this.kinchiltun * 1152000000) * this.sign
  }

  /**
   * Return the sum of this Long Count and the supplied
   * @param {DistanceNumber} newLc
   * @return {LongcountAddition}
   */
  plus (newLc) {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountAddition(DistanceNumber, this, newLc)
  }

  /**
   * Return the difference between this Long Count and the supplied
   * @param {DistanceNumber} newLc
   * @return {LongcountAddition}
   */
  minus (newLc) {
    /*  We pass the LongCount class in, as to require this in the operation
     *  will create a circular dependency.
     */
    return new LongcountSubtraction(DistanceNumber, this, newLc)
  }

  /**
   * Make sure the elements of the Long Count do not exceed
   * @return {DistanceNumber}
   */
  normalise () {
    const totalKIn = this.getPosition()
    const norm = new DistanceNumber()
    norm.kIn = totalKIn % 20
    // eslint-disable-next-line no-mixed-operators
    norm.winal = (totalKIn - norm.getPosition()) / 20 % 18
    // eslint-disable-next-line no-mixed-operators
    norm.tun = (totalKIn - norm.getPosition()) / 360 % 20
    // eslint-disable-next-line no-mixed-operators
    norm.kAtun = (totalKIn - norm.getPosition()) / 7200 % 20
    // eslint-disable-next-line no-mixed-operators
    norm.bakTun = (totalKIn - norm.getPosition()) / 144000 % 20
    // eslint-disable-next-line no-mixed-operators
    norm.piktun = (totalKIn - norm.getPosition()) / 2880000 % 20
    // eslint-disable-next-line no-mixed-operators
    norm.kalabtun = (totalKIn - norm.getPosition()) / 57600000 % 20
    // eslint-disable-next-line no-mixed-operators
    norm.kinchiltun = (totalKIn - norm.getPosition()) / 1152000000 % 20
    const foundNegative = norm.parts.reduce(
      (found, part) => found || (part < 0),
      false,
    )
    this.sign = foundNegative ? -1 : 1
    this.parts = norm.parts.map((part) => Math.abs(part))
    return this
  }

  /**
   * Convert the LongCount to a string and pad the sections of the fullDate
   * @returns {string}
   */
  toString () {
    let significantDigits = []
    for (let i = this.parts.length - 1; i >= 0; i -= 1) {
      const part = this.parts[i]
      if (part !== 0) {
        significantDigits = this.parts.slice(0, i + 1).reverse()
        break
      }
    }

    for (let i = 0; i < significantDigits.length; i += 1) {
      if (significantDigits[i] === undefined) {
        significantDigits[i] = '0'
      }
    }

    const dateLength = significantDigits.length
    if (dateLength < 5) {
      significantDigits = significantDigits.reverse()
      for (let i = 0; i < 5 - dateLength; i += 1) {
        significantDigits.push(' 0')
      }
      significantDigits = significantDigits.reverse()
    }

    for (let i = 0; i < significantDigits.length; i += 1) {
      const part = significantDigits[i].toString()
      if (part.length < 2) {
        significantDigits[i] = ` ${part}`
      }
    }
    return `${this.sign === -1 ? '-' : ''}${significantDigits.join('.')}`
  }
}

module.exports = DistanceNumber
