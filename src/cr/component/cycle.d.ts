import Base from "./base";
import HashMap from "../../structs/hashMap";
import { Wildcard } from "../../wildcard";
declare function singletonGenerator<T>(lookup: HashMap, classGenerator: (name: string) => T): (cycleName: number | string | Wildcard) => T;
declare abstract class Cycle<T> extends Base {
    protected privateNext: Cycle<T>;
    position: number;
    protected value: string | Wildcard;
    protected generator: (cycleName: number | string) => Cycle<T>;
    protected cycleLength: number;
    constructor(value: number | string | Wildcard, lookup: HashMap, generator: (cycleName: number | string) => Cycle<T>);
    next(): Cycle<T>;
    shift(incremental: number): Cycle<T>;
    toString(): string;
    abstract validate(): boolean;
}
export { singletonGenerator, Cycle };
