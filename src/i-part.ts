import { Comment } from "./comment";

export interface IPart {
  comment: Comment | undefined;

  setComment(comment: Comment): IPart;

  appendComment(comment: Comment): IPart;

  equal(other: any): boolean;
}

export function isPart(o: any): o is IPart {
  return ((o as IPart).equal !== undefined) &&
    ((o as IPart).setComment !== undefined) &&
    ((o as IPart).appendComment !== undefined)
}
