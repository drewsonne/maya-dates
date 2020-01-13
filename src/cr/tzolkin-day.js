/**
 * Mapping of day names to indexes
 * @type {Map<number, string>}
 */
const days = [
  undefined,
  'Imix',
  'Ik\'',
  'Ak\'bal',
  'K\'an',
  'Chikchan',
  'Kimi',
  'Manik\'',
  'Lamat',
  'Muluk',
  'Ok',
  'Chuwen',
  'Eb',
  'Ben',
  'Ix',
  'Men',
  'Kib',
  'Kaban',
  'Etz\'nab',
  'Kawak',
  'Ajaw',
];

/** @ignore */
const singleton = {};

/** @ignore */
function getTzolkinDay(newDayName) {
  const dayName = (typeof newDayName === 'number') ? days[newDayName] : newDayName;
  if (singleton[dayName] === undefined) {
    singleton[dayName] = new TzolkinDay(dayName);
  }
  return singleton[dayName];
}


/**
 * Describes only the day component of a 260-day cycle
 */
class TzolkinDay {
  /**
   * @param {string|number} newName - Name or position of the 260-day cycle day
   */
  constructor(newName) {
    let name = newName;
    if (typeof name === 'number') {
      name = days[name];
    }

    /**
     * Name of the day in the 260-day cycle
     * @type {string}
     */
    this.name = name;

    /**
     * Index of the day in the list of Tzolkin' days
     * @type {number}
     */
    this.day_position = days.findIndex(
      (d) => d === this.name,
    );

    this.private_next = undefined;
  }

  /**
   * Ensure the Tzolk'in day name is defined and is within the list of
   * acceptable day names.
   */
  validate() {
    if (this.name === undefined) {
      throw new Error('Tzolk\'in day name must be provided');
    }
    if (!days.includes(this.name)) {
      throw new Error(`Tzolk'in day (${this.name}) must be in ${days}`);
    }
  }

  /**
   * Return the next day in the 260-day cycle
   * @returns {TzolkinDay}
   */
  next() {
    return this.shift(1);
  }

  /**
   *
   * @param {number} incremental
   */
  shift(incremental) {
    if (incremental === 0) {
      return this;
    }
    if (this.private_next === undefined) {
      let newIncremental = (this.day_position + 1) % 20;
      newIncremental = (newIncremental === 0) ? 20 : newIncremental;
      this.private_next = getTzolkinDay(newIncremental);
    }
    return this.private_next.shift(incremental - 1);
  }

  toString() {
    return this.name;
  }
}

module.exports = getTzolkinDay;
