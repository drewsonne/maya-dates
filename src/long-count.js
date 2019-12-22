/**
 * Long Count cycle
 */
class LongCount {
  /**
   * @param {...number} cycles - Components in the long count (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor (...cycles) {
    this.parts = cycles
    this.date_pattern = /(\d+\.?)+/
  }

  /**
   * Get specific column in Long Count date
   * @param number
   * @returns {number}
   */
  _get_date_sections (index) {
    let part = this.parts[index]
    if (part === undefined) {
      return 0
    }
    return parseInt(part)
  }

  /**
   * Set specific column in Long Count date
   * @param {number} index
   * @param {number} value
   * @returns {LongCount}
   * @private
   */
  _set_date_sections (index, value) {
    this.parts[index] = value.toString()
    this.raw = this.toString()
    return this
  }

  set k_in (new_k_in) {
    this._set_date_sections(0, new_k_in)
  }

  get k_in () {
    return this._get_date_sections(0)
  }

  set winal (new_winal) {
    this._set_date_sections(1, new_winal)
  }

  get winal () {
    return this._get_date_sections(1)
  }

  set tun (new_tun) {
    this._set_date_sections(2, new_tun)
  }

  get tun () {
    return this._get_date_sections(2)
  }

  set k_atun (new_k_atun) {
    this._set_date_sections(3, new_k_atun)
  }

  get k_atun () {
    return this._get_date_sections(3)
  }

  set bak_tun (new_bak_tun) {
    this._set_date_sections(4, new_bak_tun)
  }

  get bak_tun () {
    return this._get_date_sections(4)
  }

  set piktun (new_bak_tun) {
    this._set_date_sections(5, new_bak_tun)
  }

  get piktun () {
    return this._get_date_sections(5)
  }

  set kalabtun (new_bak_tun) {
    this._set_date_sections(6, new_bak_tun)
  }

  get kalabtun () {
    return this._get_date_sections(6)
  }

  set kinchiltun (new_bak_tun) {
    this._set_date_sections(7, new_bak_tun)
  }

  get kinchiltun () {
    return this._get_date_sections(7)
  }

  is_valid () {
    return this.date_pattern.test(this.toString())
  }

  toString () {
    let significant_digits = []
    for (let i = 0; i < this.parts.length; i++) {
      let part = this.parts[i]
      if (part !== 0) {
        significant_digits = this.parts.slice(i).reverse()
        break
      }
    }
    let date_length = significant_digits.length
    if (date_length < 5) {
      for (let i = 0; i < 5 - date_length; i++) {
        significant_digits.unshift(' 0')
      }
    }

    for (let i = 0; i < significant_digits.length; i++) {
      let part = significant_digits[i].toString()
      if (part.length < 2) {
        significant_digits[i] = ' ' + part
      }
    }
    return significant_digits.join('.')
  }
}

module.exports = {
  'LongCount': LongCount,
}
