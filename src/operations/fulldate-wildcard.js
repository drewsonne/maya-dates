// 7 Ok * * 9.*.10.10.10
const FullDate = require('../full-date')

/**
 * Given a wildcard in
 */
class FullDateWildcard {
  /**
   *
   * @param {FullDate} partial_date
   */
  constructor (partial_date) {
    this.partial = partial_date
  }

  run () {
    let potential_dates = [this.partial]
    let has_cr_partial = this.partial.cr.is_partial()
    let has_lc_partial = this.partial.lc.is_partial()
    if (!has_lc_partial) {
      let static_cr = this.partial.lc.build_calendar_round()
      return (static_cr.match(this.partial.cr)) ?
        [new FullDate(static_cr, this.partial.lc)] :
        []
    }
    if (has_cr_partial) {
    }
    return potential_dates
  }
}

module.exports = FullDateWildcard

