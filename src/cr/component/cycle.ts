import HashMap from "../../structs/hashMap";
import {isWildcard, Wildcard} from "../../wildcard";
import Base from "./base";


export default abstract class Cycle extends Base {
  /**
   * A cache of the next object in the cycle
   */
  private nextHolder: null | Cycle;
  /**
   * Absolute position within the linear cycle for this object.
   */
  public position: number;
  protected generator: (cycleName: number | string) => (Cycle | Wildcard);
  protected cycleLength: number;

  protected constructor(
    value: number | string | Wildcard,
    lookup: HashMap,
    generator: (cycleName: number | string | Wildcard) => (Cycle | Wildcard)
  ) {
    const resolvedValue = (typeof value === 'number') ?
      lookup.getValue(value) :
      value;
    if (resolvedValue === undefined) {
      throw new Error(`Value not found in lookup for index ${value}`);
    }
    super(resolvedValue);
    this.generator = generator;
    this.cycleLength = lookup.length;
    this.nextHolder = null

    if (typeof this.value === 'string') {
      this.position = lookup.getIndex(this.value)
    } else {
      throw new Error("Position could not be set.")
    }
  }

  /**
   * Return the next object in the cycle
   */
  next(): Cycle {
    return this.shift(1);
  }

  /**
   * Move an incremental number of steps in the cycle, and return the object found there.
   * @param incremental - The number of steps to move through in the cycle.
   */
  shift(incremental: number): Cycle {
    if (incremental === 0) {
      return this;
    }
    return this.nextCalculator().shift(incremental - 1)
  }

  private nextCalculator(): Cycle {
    if (this.nextHolder === null) {
      let newPosition = (this.position + 1) % (this.cycleLength - 1);
      newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
      let potentialPosition = this.generator(newPosition);
      if (isWildcard(potentialPosition)) {
        throw new Error("Can not cycle with wildcrd")
      } else {
        this.nextHolder = potentialPosition
      }
    }
    if (this.nextHolder !== null) {
      return this.nextHolder
    } else {
      throw new Error("Can not cycle with wildcrd")
    }
  }

  /**
   * Render this cycle object as a string
   */
  toString(): string {
    return `${this.value}`;
  }

  abstract validate(): boolean;

}
