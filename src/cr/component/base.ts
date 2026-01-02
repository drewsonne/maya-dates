import {isWildcard, Wildcard} from "../../wildcard";
import IComponent from "./iComponent";

export default abstract class Base implements IComponent {
  protected value: Wildcard | string | number;

  constructor(value: Wildcard | string | number) {
    this.value = value
  }

  isWildcard(): boolean {
    return isWildcard(this.value)
  }

  toString(): string {
    return `${this.value}`
  }
}
