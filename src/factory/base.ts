/**
 * An abstract class to handle the create of an object from a string
 */
export default abstract class Factory {
  pattern: RegExp;

  /**
   * Define properties to be override by sub-classes
   */
  constructor(pattern: RegExp) {
    /**
     * Describes how to break a string into a fullDate element
     * @protected
     * @type {RegExp}
     */
    this.pattern = pattern;
  }

  /**
   * Split the provided fullDate into its components
   * @param {string} raw
   * @returns {String[]}
   * @protected
   */
  split(raw: string): string[] {
    const matches = raw.match(
      this.pattern
    );
    if (matches === null) {
      return [];
    }
    return matches.slice(1);
  }
}
