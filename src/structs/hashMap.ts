export default class HashMap {
  private valueToIndex: { [key: string]: number };
  private indexToValue: string[];

  constructor(raw: string[]) {
    this.indexToValue = raw;
    const initialValueToIndex: { [key: string]: number } = {};
    this.valueToIndex = this.indexToValue.reduce(
      (obj, elem, idx) => {
        obj[elem] = idx;
        return obj
      },
      initialValueToIndex
    )
  }

  getValue(index: number) {
    return this.indexToValue[index];
  }

  getIndex(value: string) {
    return this.valueToIndex[value];
  }

  includes(value: string): boolean {
    return this.indexToValue.includes(value)
  }

  get length() {
    return this.indexToValue.length;
  }

  toString(): string {
    return `${this.indexToValue}`
  }
}
