import HashMap from "../../structs/hashMap";
import {Wildcard} from "../../wildcard";
import Base from "./base";

function singletonGenerator<T>(lookup: HashMap, classGenerator: (name: string) => T): (cycleName: number | string | Wildcard) => T {
  const singleton: { [key: string]: T } = {};

  function cycleSingleton(newCycleName: number | string | Wildcard): T {
    let cycleName = (typeof newCycleName === 'number') ? lookup.getValue(newCycleName) : newCycleName;
    let cycleIsWildcard = false;
    const cycleNameHash = `${cycleName}`;
    if (singleton[cycleNameHash] === undefined) {
      singleton[cycleNameHash] = classGenerator(cycleNameHash)
    }
    return singleton[cycleNameHash];
  }

  return cycleSingleton
}

abstract class Cycle<T> extends Base {
  /**
   * A cache of the next object in the cycle
   */
  protected privateNext: Cycle<T>;
  /**
   * Absolute position within the linear cycle for this object.
   */
  position: number;
  protected value: string | Wildcard;
  protected generator: (cycleName: number | string) => Cycle<T>;
  protected cycleLength: number;

  constructor(
    value: number | string | Wildcard,
    lookup: HashMap,
    generator: (cycleName: number | string| Wildcard) => Cycle<T>
  ) {
    super(
      (typeof value === 'number') ?
        lookup.getValue(value) :
        value
    );
    this.generator = generator;
    this.cycleLength = lookup.length;

    if (typeof this.value === 'string') {
      this.position = lookup.getIndex(this.value)
    }
  }

  /**
   * Return the next object in the cycle
   */
  next(): Cycle<T> {
    return this.shift(1);
  }

  /**
   * Move an incremental number of steps in the cycle, and return the object found there.
   * @param incremental - The number of steps to move through in the cycle.
   */
  shift(incremental: number): Cycle<T> {
    if (incremental === 0) {
      return this;
    }
    if (this.privateNext === undefined) {
      let newPosition = (this.position + 1) % (this.cycleLength - 1);
      newPosition = (newPosition === 0) ? (this.cycleLength - 1) : newPosition;
      this.privateNext = this.generator(newPosition);
    }
    return this.privateNext.shift(incremental - 1)
  }

  /**
   * Render this cycle object as a string
   */
  toString(): string {
    return `${this.value}`;
  }

  abstract validate(): boolean;

}

export {
  singletonGenerator,
  Cycle
}
