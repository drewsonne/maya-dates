import Comment from "./comment";

export default interface IPart {
  comment: Comment | undefined;

  equal(other: IPart): boolean;
}
