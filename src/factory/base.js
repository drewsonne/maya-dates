/**
 * An abstract class to handle the create of an object from a string
 */
class Factory {
  /**
   * Define properties to be override by sub-classes
   */
  constructor() {
    /**
     * Describes how to break a string into a date element
     * @protected
     * @type {RegExp}
     */
    this.pattern = null;
  }

  /**
   * Split the provided date into its components
   * @param {string} raw
   * @access protected
   * @returns {String[]}
   */
  _split(raw) {
    let matches = raw.match(
      this.pattern,
    );
    if (matches === null) {
      return [];
    }
    return matches.slice(1);
  }

  /**
   * Checks if the string contains a partial date
   * @param {string} raw - Raw date string
   * @access protected
   * @returns {boolean}
   */
  // _is_partial (raw) {
  //   let parts = this._split(raw)
  //   return parts.includes('*')
  // }
}

module.exports = Factory;
