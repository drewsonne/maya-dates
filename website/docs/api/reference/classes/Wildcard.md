Defined in: [wildcard.ts:14](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/wildcard.ts#L14)

Minimal interface used for equality comparison across calendar components.

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new Wildcard**(): `Wildcard`

Defined in: [wildcard.ts:16](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/wildcard.ts#L16)

#### Returns

`Wildcard`

#### Overrides

`CommentWrapper.constructor`

## Properties

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`comment`](CommentWrapper.md#comment)

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

Defined in: [wildcard.ts:27](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/wildcard.ts#L27)

Compare this object with another for equality.

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

Defined in: [wildcard.ts:23](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/wildcard.ts#L23)

Render the wildcard as the character `*`.

#### Returns

`string`
