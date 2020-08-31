import {Comment, isComment} from "./comment";

export abstract class CommentWrapper {
  comment: Comment;

  protected constructor() {
    this.comment = new Comment('')
  }

  setComment(comment: Comment): any {
    this.comment = comment
    return this;
  }

  appendComment(comment: Comment): any {
    if (isComment(this.comment)) {
      this.comment = this.comment.merge(comment)
    } else {
      this.setComment(comment)
    }
    return this
  }
}

export function wrapsComment(o: any): o is CommentWrapper {
  return ((o as CommentWrapper).setComment !== undefined)
    && ((o as CommentWrapper).appendComment !== undefined)
    && ((o as CommentWrapper).comment !== undefined)
}
