Defined in: [lc/distance-number.ts:10](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L10)

Minimal interface used for equality comparison across calendar components.

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Extended by

- [`LongCount`](LongCount.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new DistanceNumber**(...`cycles`): `DistanceNumber`

Defined in: [lc/distance-number.ts:19](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L19)

#### Parameters

##### cycles

...(`number` \| [`Wildcard`](Wildcard.md))[]

Components in the long count
(eg, K'in, Winal, Bak'tun, etc)

#### Returns

`DistanceNumber`

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

### datePattern

> **datePattern**: `RegExp`

Defined in: [lc/distance-number.ts:12](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L12)

***

### parts

> **parts**: (`number` \| [`Wildcard`](Wildcard.md))[]

Defined in: [lc/distance-number.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L11)

***

### sign

> **sign**: `number`

Defined in: [lc/distance-number.ts:13](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L13)

## Accessors

### bakTun

#### Get Signature

> **get** **bakTun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:262](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L262)

Return the bak'tun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **bakTun**(`newBakTun`): `void`

Defined in: [lc/distance-number.ts:254](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L254)

Set the bak'tun component of the fullDate

##### Parameters

###### newBakTun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### isNegative

#### Get Signature

> **get** **isNegative**(): `boolean`

Defined in: [lc/distance-number.ts:60](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L60)

Return true if the Long Count is operating as a negative Distance Number.

##### Returns

`boolean`

#### Set Signature

> **set** **isNegative**(`newNegative`): `void`

Defined in: [lc/distance-number.ts:76](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L76)

Set this Long Count as being a negative Distance Number

##### Parameters

###### newNegative

`boolean`

##### Returns

`void`

***

### isPositive

#### Get Signature

> **get** **isPositive**(): `boolean`

Defined in: [lc/distance-number.ts:52](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L52)

Return true if the Long Count is positive.

##### Returns

`boolean`

#### Set Signature

> **set** **isPositive**(`newPositive`): `void`

Defined in: [lc/distance-number.ts:68](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L68)

Set this Long Count as being a Long Count or a positive Distance Number

##### Parameters

###### newPositive

`boolean`

##### Returns

`void`

***

### kalabtun

#### Get Signature

> **get** **kalabtun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:292](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L292)

Return the kalabtun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **kalabtun**(`newBakTun`): `void`

Defined in: [lc/distance-number.ts:284](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L284)

Set the kalabtun component of the fullDate

##### Parameters

###### newBakTun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### kAtun

#### Get Signature

> **get** **kAtun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:247](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L247)

Return the k'atun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **kAtun**(`newKAtun`): `void`

Defined in: [lc/distance-number.ts:239](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L239)

Set the k'atun component of the fullDate

##### Parameters

###### newKAtun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### kIn

#### Get Signature

> **get** **kIn**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:202](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L202)

Return the k'in component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **kIn**(`newKIn`): `void`

Defined in: [lc/distance-number.ts:194](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L194)

Set the k'in component of the fullDate

##### Parameters

###### newKIn

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### kinchiltun

#### Get Signature

> **get** **kinchiltun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:307](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L307)

Return the kinchiltun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **kinchiltun**(`newBakTun`): `void`

Defined in: [lc/distance-number.ts:299](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L299)

Set the kinchiltun component of the fullDate

##### Parameters

###### newBakTun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### piktun

#### Get Signature

> **get** **piktun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:277](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L277)

Return the piktun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **piktun**(`newBakTun`): `void`

Defined in: [lc/distance-number.ts:269](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L269)

Set the piktun component of the fullDate

##### Parameters

###### newBakTun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### sigParts

#### Get Signature

> **get** **sigParts**(): (`number` \| [`Wildcard`](Wildcard.md))[]

Defined in: [lc/distance-number.ts:120](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L120)

Only digits in the LC with significant digits

##### Returns

(`number` \| [`Wildcard`](Wildcard.md))[]

***

### tun

#### Get Signature

> **get** **tun**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:232](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L232)

Return the tun component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **tun**(`newTun`): `void`

Defined in: [lc/distance-number.ts:224](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L224)

Set the tun component of the fullDate

##### Parameters

###### newTun

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

***

### winal

#### Get Signature

> **get** **winal**(): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:217](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L217)

Return the winal component of the fullDate

##### Returns

`number` \| [`Wildcard`](Wildcard.md)

#### Set Signature

> **set** **winal**(`newWinal`): `void`

Defined in: [lc/distance-number.ts:209](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L209)

Set the winal component of the fullDate

##### Parameters

###### newWinal

`number` | [`Wildcard`](Wildcard.md)

##### Returns

`void`

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

### clone()

> **clone**(): `DistanceNumber`

Defined in: [lc/distance-number.ts:136](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L136)

Create a copy object of this long count fullDate

#### Returns

`DistanceNumber`

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

Defined in: [lc/distance-number.ts:85](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L85)

Given two long count dates, check if they are equal

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

### exactlyEqual()

> **exactlyEqual**(`other`): `boolean`

Defined in: [lc/distance-number.ts:107](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L107)

Given two long count dates, check if they are exactly equal

#### Parameters

##### other

`DistanceNumber`

#### Returns

`boolean`

***

### getDateSections()

> **getDateSections**(`index`): `number` \| [`Wildcard`](Wildcard.md)

Defined in: [lc/distance-number.ts:145](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L145)

Get specific column in Long Count fullDate

#### Parameters

##### index

`number`

#### Returns

`number` \| [`Wildcard`](Wildcard.md)

***

### getPosition()

> **getPosition**(): `number`

Defined in: [lc/distance-number.ts:332](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L332)

Count the number of days since 0.0.0.0.0 for this LC.

#### Returns

`number`

***

### gt()

> **gt**(`newLongCount`): `boolean`

Defined in: [lc/distance-number.ts:187](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L187)

Compare is this LC is less than the supplied LC.

#### Parameters

##### newLongCount

`DistanceNumber`

#### Returns

`boolean`

***

### isPartial()

> **isPartial**(): `boolean`

Defined in: [lc/distance-number.ts:324](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L324)

Returns true if any of the positions in the Long Count have been assigned
a Wildcard object.

#### Returns

`boolean`

***

### isValid()

> **isValid**(): `boolean`

Defined in: [lc/distance-number.ts:315](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L315)

Ensure the fullDate has only numbers and wildcards separated by points.

#### Returns

`boolean`

***

### lt()

> **lt**(`newLongCount`): `boolean`

Defined in: [lc/distance-number.ts:178](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L178)

Compare if this LC is greater than the supplied LC.

#### Parameters

##### newLongCount

`DistanceNumber`

#### Returns

`boolean`

***

### map()

> **map**(`fn`): `any`[]

Defined in: [lc/distance-number.ts:169](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L169)

Pass the map down to the parts

#### Parameters

##### fn

(`lcPart`, `lcPartIndex`) => `any`

#### Returns

`any`[]

***

### minus()

> **minus**(`newLc`): [`LongcountSubtraction`](LongcountSubtraction.md)

Defined in: [lc/distance-number.ts:381](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L381)

Return the difference between this Long Count and the supplied

#### Parameters

##### newLc

`DistanceNumber`

#### Returns

[`LongcountSubtraction`](LongcountSubtraction.md)

***

### normalise()

> **normalise**(): `DistanceNumber`

Defined in: [lc/distance-number.ts:399](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L399)

Make sure the elements of the Long Count do not exceed their valid ranges.
Converts the Long Count to total days, then decomposes back to normalized
form with proper carry/borrow per the mixed-radix system [R1, R2]:
- k'in ∈ [0,19]
- winal ∈ [0,17] (18 winal = 1 tun)
- tun ∈ [0,19]
- k'atun ∈ [0,19]
- bak'tun and higher are unbounded

#### Returns

`DistanceNumber`

***

### plus()

> **plus**(`newLc`): [`LongcountAddition`](LongcountAddition.md)

Defined in: [lc/distance-number.ts:369](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L369)

Return the sum of this Long Count and the supplied

#### Parameters

##### newLc

`DistanceNumber`

#### Returns

[`LongcountAddition`](LongcountAddition.md)

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

### setDateSections()

> **setDateSections**(`index`, `newValue`): `DistanceNumber`

Defined in: [lc/distance-number.ts:159](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L159)

Set specific column in Long Count fullDate

#### Parameters

##### index

`number`

##### newValue

`number` | [`Wildcard`](Wildcard.md)

#### Returns

`DistanceNumber`

***

### toString()

> **toString**(): `string`

Defined in: [lc/distance-number.ts:454](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L454)

Convert the LongCount to a string and pad the sections of the fullDate

#### Returns

`string`
