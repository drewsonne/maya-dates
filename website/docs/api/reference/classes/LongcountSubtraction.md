Defined in: [operations/longcount-subtraction.ts:8](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/operations/longcount-subtraction.ts#L8)

Base class for operations that manipulate [LongCount](LongCount.md) values.

## Extends

- [`LongcountOperation`](LongcountOperation.md)

## Constructors

### Constructor

> **new LongcountSubtraction**(`lcClass`, `a`, `b`): `LongcountSubtraction`

Defined in: [operations/longcount-operation.ts:22](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/operations/longcount-operation.ts#L22)

#### Parameters

##### lcClass

[`ILongcount`](../interfaces/ILongcount.md)

LongCount constructor passed in to avoid circular dependencies.

##### a

[`DistanceNumber`](DistanceNumber.md)

First operand.

##### b

[`DistanceNumber`](DistanceNumber.md)

Second operand.

#### Returns

`LongcountSubtraction`

#### Inherited from

[`LongcountOperation`](LongcountOperation.md).[`constructor`](LongcountOperation.md#constructor)

## Properties

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`LongcountOperation`](LongcountOperation.md).[`comment`](LongcountOperation.md#comment)

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

[`LongcountOperation`](LongcountOperation.md).[`appendComment`](LongcountOperation.md#appendcomment)

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

[`LongcountOperation`](LongcountOperation.md).[`commentIsEqual`](LongcountOperation.md#commentisequal)

***

### equal()

> **equal**(`other`): `boolean`

Defined in: [operations/longcount-subtraction.ts:56](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/operations/longcount-subtraction.ts#L56)

Compare this object with another for equality.

#### Parameters

##### other

`unknown`

#### Returns

`boolean`

#### Overrides

[`LongcountOperation`](LongcountOperation.md).[`equal`](LongcountOperation.md#equal)

***

### equals()

> **equals**(): [`IPart`](../interfaces/IPart.md)

Defined in: [operations/longcount-subtraction.ts:13](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/operations/longcount-subtraction.ts#L13)

Calculate the resulting [LongCount](LongCount.md) difference.

#### Returns

[`IPart`](../interfaces/IPart.md)

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

[`LongcountOperation`](LongcountOperation.md).[`equalWithComment`](LongcountOperation.md#equalwithcomment)

***

### resetComment()

> **resetComment**(): `this`

Defined in: [comment-wrapper.ts:20](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L20)

Reset the current comment back to an empty comment.

#### Returns

`this`

#### Inherited from

[`LongcountOperation`](LongcountOperation.md).[`resetComment`](LongcountOperation.md#resetcomment)

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

[`LongcountOperation`](LongcountOperation.md).[`setComment`](LongcountOperation.md#setcomment)
