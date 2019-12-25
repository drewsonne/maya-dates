/**
 * Long Count cycle
 */
class LongCount {
  /**
   * @param {...number|Wildcard} cycles - Components in the long count (eg, K'in, Winal, Bak'tun, etc)
   */
  constructor (...cycles) {
    /**
     * Date Components
     * @type {number|Wildcard[]}
     */
    this.parts = cycles

    /**
     * Pattern to validate the date
     * @type {RegExp}
     */
    this.date_pattern = /([\d*]+\.?)+/

    /**
     * Convert individual components to a single string
     * @type {string}
     */
    this.raw = this.toString()
  }

  /**
   * Create a copy object of this long count date
   * @returns {LongCount}
   */
  clone () {
    return new LongCount(...this.parts)
  }

  /**
   * Get specific column in Long Count date
   * @param {number} index
   * @returns {number}
   */
  _get_date_sections (index) {
    let part = this.parts[index]
    if (part === undefined) {
      return 0
    }
    return part
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

  /**
   * Return the number of positions in the long count
   * @returns {number}
   */
  get length () {
    return this.parts.length
  }

  /**
   * Set the k'in component of the date
   * @returns {number}
   */
  set k_in (new_k_in) {
    this._set_date_sections(0, new_k_in)
  }

  /**
   * Return the k'in component of the date
   * @returns {number}
   */
  get k_in () {
    return this._get_date_sections(0)
  }

  /**
   * Set the winal component of the date
   * @returns {number}
   */
  set winal (new_winal) {
    this._set_date_sections(1, new_winal)
  }

  /**
   * Return the winal component of the date
   * @returns {number}
   */
  get winal () {
    return this._get_date_sections(1)
  }

  /**
   * Set the tun component of the date
   * @returns {number}
   */
  set tun (new_tun) {
    this._set_date_sections(2, new_tun)
  }

  /**
   * Return the tun component of the date
   * @returns {number}
   */
  get tun () {
    return this._get_date_sections(2)
  }

  /**
   * Set the k'atun component of the date
   * @returns {number}
   */
  set k_atun (new_k_atun) {
    this._set_date_sections(3, new_k_atun)
  }

  /**
   * Return the k'atun component of the date
   * @returns {number}
   */
  get k_atun () {
    return this._get_date_sections(3)
  }

  /**
   * Set the bak'tun component of the date
   * @returns {number}
   */
  set bak_tun (new_bak_tun) {
    this._set_date_sections(4, new_bak_tun)
  }

  /**
   * Return the bak'tun component of the date
   * @returns {number}
   */
  get bak_tun () {
    return this._get_date_sections(4)
  }

  /**
   * Set the piktun component of the date
   * @returns {number}
   */
  set piktun (new_bak_tun) {
    this._set_date_sections(5, new_bak_tun)
  }

  /**
   * Return the piktun component of the date
   * @returns {number}
   */
  get piktun () {
    return this._get_date_sections(5)
  }

  /**
   * Set the kalabtun component of the date
   * @returns {number}
   */
  set kalabtun (new_bak_tun) {
    this._set_date_sections(6, new_bak_tun)
  }

  /**
   * Return the kalabtun component of the date
   * @returns {number}
   */
  get kalabtun () {
    return this._get_date_sections(6)
  }

  /**
   * Set the kinchiltun component of the date
   * @returns {number}
   */
  set kinchiltun (new_bak_tun) {
    this._set_date_sections(7, new_bak_tun)
  }

  /**
   * Return the kinchiltun component of the date
   * @returns {number}
   */
  get kinchiltun () {
    return this._get_date_sections(7)
  }

  /**
   * Ensure the date has only numbers and wildcards separated by points.
   * @returns {boolean}
   */
  is_valid () {
    return this.date_pattern.test(this.toString())
  }

  /**
   * Convert the LongCount to a string and pad the sections of the date
   * @returns {string}
   */
  toString () {
    let significant_digits = []
    for (let i = 0; i < this.parts.length; i++) {
      let part = this.parts[i]
      if (part !== 0) {
        significant_digits = this.parts.slice(i).reverse()
        break
      }
    }

    for (let i = 0; i < significant_digits.length; i++) {
      if (significant_digits[i] === undefined) {
        significant_digits[i] = '0'
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

module.exports = LongCount