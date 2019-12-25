const wildcard = require('../wildcard')

/**
 * Given a Long Count with a wildcard, calculate the
 * possible LongCount dates
 */
class LongCountWildcard {
  /**
   * @param {LongCount} lc
   */
  constructor (lc) {
    this.lc = lc
  }

  run () {
    let potentials = [this.lc]
    let wildcard_positions = []
    for (let i = 0; i < this.lc.length; i++) {
      if (this.lc._get_date_sections(i) === wildcard) {
        wildcard_positions.push(i)
      }
    }
    for (let position of wildcard_positions) {
      let new_potentials = []
      let iterations = (position === 1) ? 15 : 20
      for (let possible of potentials) {
        for (let k = 0; k < iterations; k++) {
          let new_lc = possible.clone()._set_date_sections(position, k)
          new_potentials.push(new_lc)
        }
      }
      potentials = new_potentials
    }
    return potentials
  }
}

module.exports = LongCountWildcard
