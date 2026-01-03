Defined in: [comment.ts:4](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L4)

Represents a free form comment that can be attached to many structures.

## Constructors

### Constructor

> **new Comment**(`content`): `Comment`

Defined in: [comment.ts:13](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L13)

Create a new comment.

#### Parameters

##### content

`string`

Initial comment text.

#### Returns

`Comment`

## Properties

### content

> **content**: `string`

Defined in: [comment.ts:6](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L6)

Raw text content.

## Methods

### empty()

> **empty**(): `boolean`

Defined in: [comment.ts:27](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L27)

Determine whether the comment is empty.

#### Returns

`boolean`

***

### equals()

> **equals**(`otherComment`): `boolean`

Defined in: [comment.ts:34](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L34)

Compare two comments by their text content.

#### Parameters

##### otherComment

`Comment`

#### Returns

`boolean`

***

### merge()

> **merge**(`other`): `Comment`

Defined in: [comment.ts:20](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L20)

Merge this comment with another, returning a new comment instance.

#### Parameters

##### other

`Comment`

#### Returns

`Comment`

***

### toString()

> **toString**(): `string`

Defined in: [comment.ts:41](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment.ts#L41)

Convert the comment to a plain string.

#### Returns

`string`
