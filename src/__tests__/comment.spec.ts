import 'mocha'
import {expect} from 'chai'
import {CommentWrapper} from "../comment-wrapper";
import {IPart} from "../i-part";

class MockCommentWrapper extends CommentWrapper {
  public constructor() {
    super();
  }
}

class MockPartCommentWrapper extends CommentWrapper implements IPart {
  content: string

  constructor(content: string) {
    super();
    this.content = content
  }

  equal(other: any): boolean {
    if (isMockPartCommentWrapper(other)) {
      return this.content === other.content
    }
    return false;
  }
}

function isMockPartCommentWrapper(other: any): other is MockPartCommentWrapper {
  return other instanceof MockPartCommentWrapper
}

describe('comment-wrapper', () => {
  const a1: MockCommentWrapper = new MockCommentWrapper().setComment('mock-comment')
  const a2: MockCommentWrapper = new MockCommentWrapper().setComment('mock-comment')
  const b1: MockCommentWrapper = new MockCommentWrapper().setComment('other-mock-comment')
  const b2: MockCommentWrapper = new MockCommentWrapper().setComment('other-mock-comment')

  it('should be equal', () => {
    expect(a1.commentIsEqual(a2)).to.be.true
    expect(b1.commentIsEqual(b2)).to.be.true
  })

  it('should not be equal', () => {
    expect(a1.commentIsEqual(b1)).to.be.false
    expect(b1.commentIsEqual(a1)).to.be.false
  })

})

describe('i-part comment-wrapper', () => {
  const c1: MockPartCommentWrapper = new MockPartCommentWrapper('part').setComment('part-comment')
  const c2: MockPartCommentWrapper = new MockPartCommentWrapper('part').setComment('part-comment')
  const d1: MockPartCommentWrapper = new MockPartCommentWrapper('part2').setComment('part2-comment')
  const d2: MockPartCommentWrapper = new MockPartCommentWrapper('part2').setComment('part2-comment')

  it('should be equal', () => {
    expect(c1.equalWithComment(c2)).to.be.true
    expect(d1.equalWithComment(d2)).to.be.true
  })

  it('should not be equal', () => {
    expect(c1.commentIsEqual(d1)).to.be.false
    expect(d1.commentIsEqual(c1)).to.be.false
  })
})

describe('resetComment functionality', () => {
  it('should reset comment to empty', () => {
    const wrapper = new MockCommentWrapper().setComment('filled')
    wrapper.resetComment()
    expect(wrapper.comment.empty()).to.be.true
  })

  it('should allow chaining after reset', () => {
    const wrapper = new MockCommentWrapper().setComment('initial')
    wrapper.resetComment().setComment('next')
    expect(wrapper.comment.toString()).to.eq('next')
  })
})
