import { Wildcard } from "../../wildcard";
export default abstract class Base implements IComponent {
    protected value: Wildcard | any;
    constructor(value: Wildcard | any);
    isWildcard(): boolean;
    toString(): string;
}
