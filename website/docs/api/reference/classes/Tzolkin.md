[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / Tzolkin

# Class: Tzolkin

Defined in: [cr/tzolkin.ts:34](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L34)

Describes a fullDate in the 260-day cycle with a position and a day

## Examples

```ts
let day = new Tzolkin(4, "Ajaw");
```

```ts
let day = new Tzolkin(4, new TzolkinDay("Ajaw"));
```

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new Tzolkin**(`newCoeff`, `newDay`): `Tzolkin`

Defined in: [cr/tzolkin.ts:62](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L62)

Constructor

#### Parameters

##### newCoeff

[`ICoefficient`](../interfaces/ICoefficient.md)

The position in the 260-day cycle

##### newDay

[`Wildcard`](Wildcard.md) | [`TzolkinDay`](TzolkinDay.md)

#### Returns

`Tzolkin`

#### Overrides

`CommentWrapper.constructor`

## Properties

### coeff

> **coeff**: [`ICoefficient`](../interfaces/ICoefficient.md)

Defined in: [cr/tzolkin.ts:42](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L42)

***

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`comment`](CommentWrapper.md#comment)

***

### day

> **day**: [`Wildcard`](Wildcard.md) \| [`TzolkinDay`](TzolkinDay.md)

Defined in: [cr/tzolkin.ts:41](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L41)

## Accessors

### name

#### Get Signature

> **get** **name**(): `string` \| [`Wildcard`](Wildcard.md)

Defined in: [cr/tzolkin.ts:222](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L222)

Return a string representation of the 260-day cycle name

##### Returns

`string` \| [`Wildcard`](Wildcard.md)

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

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`appendComment`](CommentWrapper.md#appendcomment)

***

### commentIsEqual()

> **commentIsEqual**(`otherCommentWrapper`): `boolean`

Defined in: [comment-wrapper.ts:60](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L60)

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

Defined in: [cr/tzolkin.ts:192](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L192)

Ensure this Tzolkin object has the same configuration as another Tzolkin
object. Does not take wildcards into account.

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

Defined in: [comment-wrapper.ts:67](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L67)

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

> **match**(`newTzolkin`): `boolean`

Defined in: [cr/tzolkin.ts:205](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L205)

Ensure this Tzolkin object has a matching configuration as another Tzolkin
object. Takes wildcards into account.

#### Parameters

##### newTzolkin

`Tzolkin`

#### Returns

`boolean`

***

### next()

> **next**(): `Tzolkin`

Defined in: [cr/tzolkin.ts:107](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L107)

Return the next day in the 260-day cycle

#### Returns

`Tzolkin`

***

### nextCalculator()

> **nextCalculator**(): `Tzolkin`

Defined in: [cr/tzolkin.ts:166](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L166)

#### Returns

`Tzolkin`

***

### resetComment()

> **resetComment**(): `this`

Defined in: [comment-wrapper.ts:20](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/comment-wrapper.ts#L20)

Reset the current comment back to an empty comment.

#### Returns

`this`

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`resetComment`](CommentWrapper.md#resetcomment)

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

#### Inherited from

[`CommentWrapper`](CommentWrapper.md).[`setComment`](CommentWrapper.md#setcomment)

***

### shift()

> **shift**(`newIncremental`): `Tzolkin`

Defined in: [cr/tzolkin.ts:144](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L144)

Shift this Tzolk'in date by a number of days using direct formula per [R1].
Positive values shift forward in the 260-day cycle; negative values shift backward.

Uses the adjusted modulus formula from spec §4.3-4.4:
- adjmod(x, n) = ((x - 1) mod n) + 1
- number = adjmod(currentNumber + days, 13)
- nameIndex = adjmod(currentNameIndex + days, 20)

#### Parameters

##### newIncremental

`number`

Number of days to shift (positive for forward, negative for backward)

#### Returns

`Tzolkin`

***

### toString()

> **toString**(): `string`

Defined in: [cr/tzolkin.ts:233](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L233)

Render the 260-day cycle fullDate as a string

#### Returns

`string`

***

### validate()

> **validate**(): `boolean`

Defined in: [cr/tzolkin.ts:115](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L115)

Ensure the Tzolkin's coefficients are within range and the day is defined

#### Returns

`boolean`

***

### fromDayNumber()

> `static` **fromDayNumber**(`dayNumber`): `Tzolkin`

Defined in: [cr/tzolkin.ts:93](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/tzolkin.ts#L93)

Create a Tzolk'in date from a day number (days since epoch) using direct formula per [R1] §4.4.

Formula: 
- adjmod(x, n) = ((x - 1) mod n) + 1
- number = adjmod(d + tzEpochNumber, 13)
- nameIndex = adjmod(d + tzEpochName, 20)

#### Parameters

##### dayNumber

`number`

Days since epoch (MDN), can be negative for dates before epoch

#### Returns

`Tzolkin`
