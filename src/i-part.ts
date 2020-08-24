import Comment from "./comment";

export interface IPart {
  comment: Comment | undefined;

  equal(other: IPart): boolean;
}

export function isPart(object: any): object is IPart {
  return ((object as IPart).equal !== undefined) && ((object as IPart).comment !== undefined)
}
