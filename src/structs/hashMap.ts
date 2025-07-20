/**
 * Simple bidirectional map used to translate between indexes and values.
 */
export default class HashMap {
  private valueToIndex: { [key: string]: number };
  private indexToValue: (string | undefined)[];

  /**
   * Create a new map from an array of values.
   *
   * @param raw - Array where the index represents the lookup index.
   */
  constructor(raw: (undefined | string)[]) {
    this.indexToValue = raw;
    const initialValueToIndex: { [key: string]: number } = {};
    this.valueToIndex = this.indexToValue.reduce(
      (obj, elem, idx) => {
        if (elem !== undefined) {
          obj[elem] = idx;
        }
        return obj
      },
      initialValueToIndex
    )
  }

  /**
   * Retrieve a value by index.
   */
  getValue(index: number) {
    return this.indexToValue[index];
  }

  /**
   * Retrieve an index by value.
   */
  getIndex(value: string) {
    return this.valueToIndex[value];
  }

  /**
   * Test if a value exists within the map.
   */
  includes(value: string): boolean {
    return this.indexToValue.includes(value)
  }

  /**
   * Number of items stored in the map.
   */
  get length() {
    return this.indexToValue.length;
  }

  /**
   * Convert the map to a string representation.
   */
  toString(): string {
    return `${this.indexToValue}`
  }
}
