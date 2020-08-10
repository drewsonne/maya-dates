import HashMap from "../../structs/hashMap";
import {isWildcard, Wildcard} from "../../wildcard";
import Base from "./base";

// function singletonGenerator<T>(lookup: HashMap, classGenerator: (name: string) => T): (cycleName: number | string | Wildcard) => T {
//   const singleton: { [key: string]: T } = {};
//
//   function cycleSingleton(newCycleName: number | string | Wildcard): T {
//     let cycleName = (typeof newCycleName === 'number') ? lookup.getValue(newCycleName) : newCycleName;
//     let cycleIsWildcard = false;
//     const cycleNameHash = `${cycleName}`;
//     if (singleton[cycleNameHash] === undefined) {
//       singleton[cycleNameHash] = classGenerator(cycleNameHash)
//     }
//     return singleton[cycleNameHash];
//   }
//
//   return cycleSingleton
// }

export default abstract class Cycle extends Base {
  /**
   * A cache of the next object in the cycle
   */
  private _privateNext: null | Cycle;
  /**
   * Absolute position within the linear cycle for this object.
   */
  public position: number;
  protected generator: (cycleName: number | string) => (Cycle | Wildcard);
  protected cycleLength: number;

  constructor(
    value: number | string | Wildcard,
    lookup: HashMap,
    generator: (cycleName: number | string | Wildcard) => (Cycle | Wildcard)
  ) {
    super(
      (typeof value === 'number') ?
        lookup.getValue(value) :
        value
    );
    this.generator = generator;
    this.cycleLength = lookup.length;
    this._privateNext = null

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
    return this.privateNext.shift(incremental - 1)
  }

  get privateNext(): Cycle {
    if (this._privateNext === null) {
      let newPosition = (this.position + 1) % (this.cycleLength - 1);
      newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
      let potentialPosition = this.generator(newPosition);
      if (isWildcard(potentialPosition)) {
        throw new Error("Can not cycle with wildcrd")
      } else {
        this._privateNext = potentialPosition
      }
    }
    if (this._privateNext !== null) {
      return this._privateNext
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
