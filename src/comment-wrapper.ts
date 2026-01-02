import {Comment, isComment} from "./comment";
import {IPart, isPart} from "./i-part";
import {isStringPrimitive} from "./guards";


/**
 * Mixin providing comment functionality for domain objects.
 */
export abstract class CommentWrapper {
  /** Attached comment. */
  comment: Comment;

  protected constructor() {
    this.comment = new Comment('')
  }

  /**
   * Reset the current comment back to an empty comment.
   */
  resetComment(): this {
    this.comment = new Comment('');
    return this;
  }

  /**
   * Replace the current comment.
   */
  setComment(comment: Comment | string): this {
    let castComment: Comment = new Comment('');
    if (isStringPrimitive(comment)) {
      castComment = new Comment(comment);
    } else {
      castComment = castComment.merge(comment)
    }
    this.comment = castComment
    return this;
  }

  /**
   * Append additional text to the current comment.
   */
  appendComment(comment: Comment | string): this {
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

  /**
   * Compare this wrapper's comment against another wrapper.
   */
  commentIsEqual(otherCommentWrapper: CommentWrapper): boolean {
    return this.comment.equals(otherCommentWrapper.comment);
  }

  /**
   * Check equality including the associated comment.
   */
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

/**
 * Type guard for {@link CommentWrapper}.
 */
export function wrapsComment(o: unknown): o is CommentWrapper {
  return (typeof o === 'object' && o !== null)
    && ('setComment' in o)
    && ('appendComment' in o)
    && ('comment' in o)
    && typeof (o as CommentWrapper).setComment === 'function'
    && typeof (o as CommentWrapper).appendComment === 'function'
    && isComment((o as CommentWrapper).comment);
}
