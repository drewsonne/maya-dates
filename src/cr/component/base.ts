import {Wildcard} from "../../wildcard";

export default abstract class Base implements IComponent {
  protected value: Wildcard | any;

  constructor(value: Wildcard | any) {
    this.value = value
  }

  isWildcard(): boolean {
    return this.value instanceof Wildcard
  }

  toString(): string {
    return `${this.value}`
  }
}