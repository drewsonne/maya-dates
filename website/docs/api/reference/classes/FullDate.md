Defined in: [full-date.ts:10](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L10)

Minimal interface used for equality comparison across calendar components.

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new FullDate**(`cr`, `lc`): `FullDate`

Defined in: [full-date.ts:21](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L21)

Create a new full date.

#### Parameters

##### cr

[`CalendarRound`](CalendarRound.md)

Calendar Round component.

##### lc

[`LongCount`](LongCount.md)

Long Count component.

#### Returns

`FullDate`

#### Overrides

`CommentWrapper.constructor`

## Properties

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`comment`](CommentWrapper.md#comment)

***

### cr

> **cr**: [`CalendarRound`](CalendarRound.md)

Defined in: [full-date.ts:12](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L12)

***

### lc

> **lc**: [`LongCount`](LongCount.md)

Defined in: [full-date.ts:13](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L13)

## Methods

### appendComment()

> **appendComment**(`comment`): `this`

Defined in: [comment-wrapper.ts:42](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L42)

Append additional text to the current comment.

#### Parameters

##### comment

`string` | [`Comment`](Comment.md)

#### Returns

`this`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`appendComment`](CommentWrapper.md#appendcomment)

***

### commentIsEqual()

> **commentIsEqual**(`otherCommentWrapper`): `boolean`

Defined in: [comment-wrapper.ts:60](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L60)

Compare this wrapper's comment against another wrapper.

#### Parameters

##### otherCommentWrapper

[`CommentWrapper`](CommentWrapper.md)

#### Returns

`boolean`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`commentIsEqual`](CommentWrapper.md#commentisequal)

***

### equal()

> **equal**(`other`): `boolean`

Defined in: [full-date.ts:46](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L46)

Compare two full dates for equality.
Two full dates are equal if both their Calendar Round and Long Count components are equal.

#### Parameters

##### other

[`IPart`](../interfaces/IPart.md)

#### Returns

`boolean`

#### Implementation of

[`IPart`](../interfaces/IPart.md).[`equal`](../interfaces/IPart.md#equal)

***

### equalWithComment()

> **equalWithComment**(`otherCommentWrapper`): `boolean`

Defined in: [comment-wrapper.ts:67](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L67)

Check equality including the associated comment.

#### Parameters

##### otherCommentWrapper

[`IPart`](../interfaces/IPart.md)

#### Returns

`boolean`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`equalWithComment`](CommentWrapper.md#equalwithcomment)

***

### isPartial()

> **isPartial**(): `boolean`

Defined in: [full-date.ts:38](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L38)

Determine if either component contains wildcards.

#### Returns

`boolean`

***

### resetComment()

> **resetComment**(): `this`

Defined in: [comment-wrapper.ts:20](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L20)

Reset the current comment back to an empty comment.

#### Returns

`this`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`resetComment`](CommentWrapper.md#resetcomment)

***

### setComment()

> **setComment**(`comment`): `this`

Defined in: [comment-wrapper.ts:28](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L28)

Replace the current comment.

#### Parameters

##### comment

`string` | [`Comment`](Comment.md)

#### Returns

`this`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`setComment`](CommentWrapper.md#setcomment)

***

### toString()

> **toString**(): `string`

Defined in: [full-date.ts:31](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/full-date.ts#L31)

Render the full date as a string containing both components.

#### Returns

`string`
