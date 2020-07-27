/**
 * Correlation Constant to align Long Counts with Western Calendars
 */
export class CorrelationConstant {
  value: number;
  name: string

  /**
   * Set a name and value
   * @param {number} value
   * @param {string} name
   */
  constructor(value: number, name: string) {
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
const rawCorrelationConstants: [number, string][] = [[394483, 'Bowditch'],
  [489138, 'Makesom'],
  [489384, 'Spinden'],
  [584281, 'Martinéz-Hernando'],
  [584283, 'GMT'],
  [584285, 'Astronomical'],
  [584286, 'Martin-Skidmore'],
  [660208, 'Wells, Fuls'],
]
let _correlationConstants: { [key: string]: CorrelationConstant } = {}
const correlationConstants = rawCorrelationConstants.reduce((obj, n) => {
  const corr = new CorrelationConstant(n[0], n[1]);
  obj[corr.name] = corr;
  obj[corr.value] = corr;
  return obj;
}, _correlationConstants)

/**
 * Return a Lord of the Night by its G id.
 * @return {CorrelationConstant}
 */
export function getCorrelationConstant(id: string): CorrelationConstant;
export function getCorrelationConstant(id: number): CorrelationConstant;
export function getCorrelationConstant(id: number | string): CorrelationConstant {
  if (id in correlationConstants) {
    return correlationConstants[id];
  } else {
    throw new Error(`Could not find ${id} in defaults, and 'name' was not provided for new Correlation Constant`);
  }
}

