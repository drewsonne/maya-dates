Defined in: [cr/haab.ts:35](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L35)

Describes a Haab fullDate with a position and a month

## Examples

```ts
let day = new Haab(8, "Kumk'u");
```

```ts
let day = new Haab(8, new HaabMonth("Kumk'u"));
```

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new Haab**(`coeff`, `month`): `Haab`

Defined in: [cr/haab.ts:51](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L51)

Constructor

#### Parameters

##### coeff

[`ICoefficient`](../interfaces/ICoefficient.md)

The position in the Haab month for this date

##### month

[`Wildcard`](Wildcard.md) | [`HaabMonth`](HaabMonth.md)

#### Returns

`Haab`

#### Overrides

`CommentWrapper.constructor`

## Properties

### coeff

> **coeff**: [`ICoefficient`](../interfaces/ICoefficient.md)

Defined in: [cr/haab.ts:42](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L42)

***

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`comment`](CommentWrapper.md#comment)

***

### month

> **month**: [`Wildcard`](Wildcard.md) \| [`HaabMonth`](HaabMonth.md)

Defined in: [cr/haab.ts:43](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L43)

## Accessors

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [cr/haab.ts:151](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L151)

Return a string representation of the Haab month name

##### Returns

`string`

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

Defined in: [cr/haab.ts:227](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L227)

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

### match()

> **match**(`otherHaab`): `boolean`

Defined in: [cr/haab.ts:137](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L137)

Ensure this Haab object has a matching configuration as another Haab object.
Takes wildcards into account.

#### Parameters

##### otherHaab

`Haab`

#### Returns

`boolean`

***

### next()

> **next**(): `Haab`

Defined in: [cr/haab.ts:129](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L129)

Return the next day in the Haab cycle

#### Returns

`Haab`

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

### shift()

> **shift**(`numDays`): `Haab`

Defined in: [cr/haab.ts:166](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L166)

Move this date through the Haab cycle using direct formula per [R1] §3.3.

Formula:
- H = (currentH + days) mod 365, where currentH is the day-of-year index
- monthIndex = ⌊H / 20⌋ + 1
- day = H mod 20

#### Parameters

##### numDays

`number`

Number of days to shift (positive for forward, negative for backward)

#### Returns

`Haab`

***

### toString()

> **toString**(): `string`

Defined in: [cr/haab.ts:223](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L223)

Render the Haab fullDate as a string

#### Returns

`string`

***

### validate()

> **validate**(): `boolean`

Defined in: [cr/haab.ts:75](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L75)

Ensure the Haab's coefficients are within range and the month is defined

#### Returns

`boolean`

***

### fromDayNumber()

> `static` **fromDayNumber**(`dayNumber`): `Haab`

Defined in: [cr/haab.ts:108](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/haab.ts#L108)

Create a Haab' date from a day number (days since epoch) using direct formula per [R1] §3.3.

Formula:
- H = (d + haabEpochDay + 20·(haabEpochMonth − 1)) mod 365
- monthIndex = ⌊H / 20⌋ + 1
- day = H mod 20

#### Parameters

##### dayNumber

`number`

Days since Long Count epoch (Maya Day Number)

#### Returns

`Haab`
