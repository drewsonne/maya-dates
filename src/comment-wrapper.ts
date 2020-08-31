import {Comment, isComment} from "./comment";
import {IPart, isPart} from "./i-part";
import {isStringPrimitive} from "./guards";


export abstract class CommentWrapper {
  comment: Comment;

  protected constructor() {
    this.comment = new Comment('')
  }

  setComment(comment: Comment | string): any {
    let castComment: Comment = new Comment('');
    if (isStringPrimitive(comment)) {
      castComment = new Comment(comment);
    } else {
      castComment = castComment.merge(comment)
    }
    this.comment = castComment
    return this;
  }

  appendComment(comment: Comment | string): any {
    let castComment: Comment = new Comment('')
    if (isStringPrimitive(comment)) {
      castComment = new Comment(comment);
    } else {
      castComment = castComment.merge(comment)
    }
    if (isComment(this.comment)) {
      this.comment = this.comment.merge(castComment)
    } else {
      this.setComment(castComment)
    }
    return this
  }

  commentIsEqual(otherCommentWrapper: CommentWrapper): boolean {
    return this.comment.equals(otherCommentWrapper.comment);
  }

  equalWithComment(otherCommentWrapper: IPart): boolean {
    let result = true
    if (wrapsComment(otherCommentWrapper)) {
      result &&= this.commentIsEqual(otherCommentWrapper)
      if (isPart(this)) {
        result &&= otherCommentWrapper.equal(this)
      } else {
        result = false
      }
    } else {
      result = false
    }
    return result
  }
}

export function wrapsComment(o: any): o is CommentWrapper {
  return ((o as CommentWrapper).setComment !== undefined)
    && ((o as CommentWrapper).appendComment !== undefined)
    && ((o as CommentWrapper).comment !== undefined)
}
