[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / CommentWrapper

# Abstract Class: CommentWrapper

Defined in: [comment-wrapper.ts:9](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L9)

Mixin providing comment functionality for domain objects.

## Extended by

- [`FullDate`](FullDate.md)
- [`DistanceNumber`](DistanceNumber.md)
- [`CalendarRound`](CalendarRound.md)
- [`Tzolkin`](Tzolkin.md)
- [`Haab`](Haab.md)
- [`LongCountWildcard`](LongCountWildcard.md)
- [`CalendarRoundWildcard`](CalendarRoundWildcard.md)
- [`FullDateWildcard`](FullDateWildcard.md)
- [`LongcountOperation`](LongcountOperation.md)
- [`Wildcard`](Wildcard.md)

## Properties

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L11)

Attached comment.

## Methods

### appendComment()

> **appendComment**(`comment`): `this`

Defined in: [comment-wrapper.ts:42](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L42)

Append additional text to the current comment.

#### Parameters

##### comment

`string` | [`Comment`](Comment.md)

#### Returns

`this`

***

### commentIsEqual()

> **commentIsEqual**(`otherCommentWrapper`): `boolean`

Defined in: [comment-wrapper.ts:60](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L60)

Compare this wrapper's comment against another wrapper.

#### Parameters

##### otherCommentWrapper

`CommentWrapper`

#### Returns

`boolean`

***

### equalWithComment()

> **equalWithComment**(`otherCommentWrapper`): `boolean`

Defined in: [comment-wrapper.ts:67](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L67)

Check equality including the associated comment.

#### Parameters

##### otherCommentWrapper

[`IPart`](../interfaces/IPart.md)

#### Returns

`boolean`

***

### resetComment()

> **resetComment**(): `this`

Defined in: [comment-wrapper.ts:20](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L20)

Reset the current comment back to an empty comment.

#### Returns

`this`

***

### setComment()

> **setComment**(`comment`): `this`

Defined in: [comment-wrapper.ts:28](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L28)

Replace the current comment.

#### Parameters

##### comment

`string` | [`Comment`](Comment.md)

#### Returns

`this`
