/** @ignore */
const months = [
  undefined,
  'Pop',
  'Wo',
  'Sip',
  'Sotz\'',
  'Sek',
  'Xul',
  'Yaxk\'in',
  'Mol',
  'Ch\'en',
  'Yax',
  'Sak',
  'Keh',
  'Mak',
  'K\'ank\'in',
  'Muwan',
  'Pax',
  'K\'ayab',
  'Kumk\'u',
  'Wayeb'
];

/** @ignore */
const monthIndices = {
  undefined: 0,
  Pop: 1,
  Wo: 2,
  Sip: 3,
  'Sotz\'': 4,
  Sek: 5,
  Xul: 6,
  'Yaxk\'in': 7,
  Mol: 8,
  'Ch\'en': 9,
  Yax: 10,
  Sak: 11,
  Keh: 12,
  Mak: 13,
  'K\'ank\'in': 14,
  Muwan: 15,
  Pax: 16,
  'K\'ayab': 17,
  'Kumk\'u': 18,
  Wayeb: 19
};

/** @ignore */
const singleton = {};

/**
 * Return a comparable HaabMonth instantiation.
 * @param name
 * @return {HaabMonth}
 */
function getHaabMonth(name) {
  const monthName = (typeof name === 'number') ? months[name] : name;
  if (singleton[monthName] === undefined) {
    // eslint-disable-next-line no-use-before-define
    singleton[monthName] = new HaabMonth(monthName);
  }
  return singleton[monthName];
}

/**
 * Describes only the month component of a Haab fullDate
 */
class HaabMonth {
  /**
   * @param {string} name - Name of the Haab month
   */
  constructor(name) {
    /**
     * Name of the Haab month
     * @type {string}
     */
    this.name = name;

    /**
     * @type {number}
     */
    this.month_position = monthIndices[this.name];
  }

  /**
   * Return the next month in the Haab cycle
   * @returns {HaabMonth}
   */
  next() {
    return this.shift(1);
  }

  /**
   * Ensure a Haab month name is defined, and that the month name is within the
   * set of allowable values.
   */
  validate() {
    if (this.name === undefined) {
      throw new Error('Haab\' month name must be provided');
    }
    if (!months.includes(this.name)) {
      throw new Error(`Haab' day (${this.name}) must be in ${months}`);
    }
  }

  /**
   * Shift a HaabMonth fullDate forward through time. Does not modify this
   * object and will return a new object.
   * @param {number} increment - Number of months to move forward
   * @return {HaabMonth}
   */
  shift(increment) {
    let newIncremental = (this.month_position + increment) % 19;
    newIncremental = (newIncremental === 0) ? 19 : newIncremental;
    return getHaabMonth(newIncremental);
  }

  /**
   * Render this month as a string
   * @return {string}
   */
  toString() {
    return this.name;
  }
}

export default {
  HaabMonth,
  getHaabMonth,
};
