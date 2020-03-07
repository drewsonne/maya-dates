/**
 * Describes one of the 9 Lords of the night.
 * This class is accessible through its instantiated values, or the get()
 * method.
 * @example
 *  let lord_of_night_g8_1 = mayadates.lc.night.get('G8')
 *  let lord_of_night_g8_2 = mayadates.lc.night.G8
 *  console.log(lord_of_night_g8_1 === lord_of_night_g8_2)
 */
// eslint-disable-next-line max-classes-per-file
class LordOfNight {
  /**
   * @param {number} id
   */
  constructor(id) {
    /**
     * Number of the Lord of the Night
     * @type {number}
     */
    this.id = id;
  }

  /**
   * Represent the Lord of the night as a string G1..G9.
   * @return {string}
   */
  toString() {
    return `G${this.id}`;
  }
}

/**
 * Collection of al the 9 Lords of the night.
 */
class LordsOfTheNight {
  /**
   * Populate holder with all Lords of the night.
   */
  constructor() {
    /** @ignore */
    this.G1 = new LordOfNight(1);
    /** @ignore */
    this.G2 = new LordOfNight(2);
    /** @ignore */
    this.G3 = new LordOfNight(3);
    /** @ignore */
    this.G4 = new LordOfNight(4);
    /** @ignore */
    this.G5 = new LordOfNight(5);
    /** @ignore */
    this.G6 = new LordOfNight(6);
    /** @ignore */
    this.G7 = new LordOfNight(7);
    /** @ignore */
    this.G8 = new LordOfNight(8);
    /** @ignore */
    this.G9 = new LordOfNight(9);
  }

  /**
   * Return a Lord of the Night by its G id.
   * @param {string} id - Has the form 'G1', 'G2', etc.
   * @return {LordOfNight}
   */
  get(id) {
    return this[`${id}`];
  }
}

export default new LordsOfTheNight();
