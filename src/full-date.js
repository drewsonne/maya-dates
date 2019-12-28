class FullDate {
  /**
   *
   * @param {CalendarRound} cr
   * @param {LongCount} lc
   */
  constructor (cr, lc) {
    this.cr = cr
    this.lc = lc
  }

  toString () {
    return `${this.cr} ${this.lc}`
  }

}

module.exports = FullDate
