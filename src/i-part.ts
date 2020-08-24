import Comment from "./comment";

export interface IPart {
  comment: Comment | undefined;

  equal(other: any): boolean;
}

export function isPart(o: any): o is IPart {
  return (o as IPart).equal !== undefined;
}
