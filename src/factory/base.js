/**
 * An abstract class to handle the create of an object from a string
 */
class Factory {
  /**
   * Define properties to be override by sub-classes
   */
  constructor() {
    /**
     * Describes how to break a string into a fullDate element
     * @protected
     * @type {RegExp}
     */
    this.pattern = null;
  }

  /**
   * Split the provided fullDate into its components
   * @param {string} raw
   * @access protected
   * @returns {String[]}
   */
  split(raw) {
    const matches = raw.match(
      this.pattern
    );
    if (matches === null) {
      return [];
    }
    return matches.slice(1);
  }

  /**
   * Checks if the string contains a fullDate fullDate
   * @param {string} raw - Raw fullDate string
   * @access protected
   * @returns {boolean}
   */
  // _is_partial (raw) {
  //   let parts = this.split(raw)
  //   return parts.includes('*')
  // }
}

module.exports = Factory;
