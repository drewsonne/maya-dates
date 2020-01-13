/**
 * Describes one of the 9 Lords of the night.
 * This class is accessible through its instantiated values, or the get()
 * method.
 * @example
 *  let lord_of_night_g8_1 = mayadates.lc.night.get('G8')
 *  let lord_of_night_g8_2 = mayadates.lc.night.G8
 *  console.log(lord_of_night_g8_1 === lord_of_night_g8_2)
 */
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
 * Return a Lord of the Night by its G id.
 * @param {string} id - Has the form 'G1', 'G2', etc.
 * @return {LordOfNight}
 */
function get(id) {
  return lordsOfTheNight[`${id}`];
}

/** @ignore */
const lordsOfTheNight = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
].reduce((obj, n) => {
  const lord = new LordOfNight(n);
  const newObj = obj;
  newObj[`${lord}`] = lord;
  return newObj;
}, {
  get,
});

module.exports = lordsOfTheNight;
