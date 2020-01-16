/**
 * Correlation Constant to align Long Counts with Western Calendars
 */
class CorrelationConstant {
  /**
   * Set a name and value
   * @param {number} value
   * @param {string} name
   */
  constructor(value, name) {
    /**
     * @type {number}
     */
    this.value = value;

    /**
     * @type {string}
     */
    this.name = name;
  }
}

/** @ignore */
const correlationConstants = [[394483, 'Bowditch'],
  [489138, 'Makesom'],
  [489384, 'Spinden'],
  [584281, 'Martinéz-Hernando'],
  [584283, 'GMT'],
  [584285, 'Astronomical'],
  [584286, 'Martin-Skidmore'],
  [660208, 'Wells, Fuls'],
].reduce((obj, n) => {
  const corr = new CorrelationConstant(...n);
  const newObj = obj;
  newObj[corr.name] = corr;
  newObj[corr.value] = corr;
  return newObj;
});

/**
 * Return a Lord of the Night by its G id.
 * @param {string|number} id - Has the form 'G1', 'G2', etc.
 * @param {string} name - Optional name when creating a new Correlation Constant
 * @return {CorrelationConstant}
 */
function getCorrelationConstant(id, name) {
  if (id in correlationConstants) {
    return correlationConstants[id];
  }
  if (name === undefined) {
    throw new Error(`Could not find ${id} in defaults, and 'name' was not provided for new Correlation Constant`);
  }
  const newCorrConst = new CorrelationConstant(id, name);
  correlationConstants[newCorrConst.name] = newCorrConst;
  correlationConstants[newCorrConst.value] = newCorrConst;
  return newCorrConst;
}


module.exports = getCorrelationConstant;
