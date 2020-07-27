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
class LordOfTheNight {
  id: number;

  /**
   * @param {number} id
   */
  constructor(id: number) {
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
class _LordsOfTheNight {
  G1: LordOfTheNight;
  G2: LordOfTheNight;
  G3: LordOfTheNight;
  G4: LordOfTheNight;
  G5: LordOfTheNight;
  G6: LordOfTheNight;
  G7: LordOfTheNight;
  G8: LordOfTheNight;
  G9: LordOfTheNight;
  lookup: { [key: string]: LordOfTheNight };

  /**
   * Populate holder with all Lords of the night.
   */
  constructor() {
    /** @ignore */
    this.G1 = new LordOfTheNight(1);
    /** @ignore */
    this.G2 = new LordOfTheNight(2);
    /** @ignore */
    this.G3 = new LordOfTheNight(3);
    /** @ignore */
    this.G4 = new LordOfTheNight(4);
    /** @ignore */
    this.G5 = new LordOfTheNight(5);
    /** @ignore */
    this.G6 = new LordOfTheNight(6);
    /** @ignore */
    this.G7 = new LordOfTheNight(7);
    /** @ignore */
    this.G8 = new LordOfTheNight(8);
    /** @ignore */
    this.G9 = new LordOfTheNight(9);

    this.lookup = {
      'G1': this.G1,
      'G2': this.G2,
      'G3': this.G3,
      'G4': this.G4,
      'G5': this.G5,
      'G6': this.G6,
      'G7': this.G7,
      'G8': this.G8,
      'G9': this.G9
    }
  }

  /**
   * Return a Lord of the Night by its G id.
   * @param {string} id - Has the form 'G1', 'G2', etc.
   * @return {LordOfTheNight}
   */
  get(id: string): LordOfTheNight {
    return this.lookup[id];
  }
}

const lords = new _LordsOfTheNight()


export {lords, LordOfTheNight}
