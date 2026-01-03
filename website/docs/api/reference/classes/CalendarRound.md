Defined in: [cr/calendar-round.ts:37](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L37)

A combination of 260-day cycles and the Haab cycle. This class should not
be instantiated directly, and should be accessed through getCalendarRound.

## See

## Example

```ts
let cr = new CalendarRound(4, "Ajaw", 8, "Kumk'u");
```

## Extends

- [`CommentWrapper`](CommentWrapper.md)

## Implements

- [`IPart`](../interfaces/IPart.md)

## Constructors

### Constructor

> **new CalendarRound**(`tzolkin`, `haab`): `CalendarRound`

Defined in: [cr/calendar-round.ts:41](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L41)

#### Parameters

##### tzolkin

[`Tzolkin`](Tzolkin.md)

##### haab

[`Haab`](Haab.md)

#### Returns

`CalendarRound`

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

### haab

> **haab**: [`Haab`](Haab.md)

Defined in: [cr/calendar-round.ts:39](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L39)

***

### tzolkin

> **tzolkin**: [`Tzolkin`](Tzolkin.md)

Defined in: [cr/calendar-round.ts:38](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L38)

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

Defined in: [cr/calendar-round.ts:176](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L176)

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

### isPartial()

> **isPartial**(): `boolean`

Defined in: [cr/calendar-round.ts:162](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L162)

Return true, if this function has any wildcard portions.

#### Returns

`boolean`

***

### match()

> **match**(`newCr`): `boolean`

Defined in: [cr/calendar-round.ts:143](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L143)

Check that this Calendar Round matches another CalendarRound. If one CR has
wildcards and the other does not, this function will return true.

#### Parameters

##### newCr

`CalendarRound`

#### Returns

`boolean`

***

### minus()

> **minus**(`targetCr`): [`DistanceNumber`](DistanceNumber.md)

Defined in: [cr/calendar-round.ts:107](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L107)

Return a long count date representing the difference between two dates.

#### Parameters

##### targetCr

`CalendarRound`

#### Returns

[`DistanceNumber`](DistanceNumber.md)

***

### next()

> **next**(): `CalendarRound`

Defined in: [cr/calendar-round.ts:100](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L100)

Increment both the Haab and 260-day cycle to the next day in the Calendar Round

#### Returns

`CalendarRound`

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

> **shift**(`increment`): `CalendarRound`

Defined in: [cr/calendar-round.ts:152](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L152)

Shift a CalendarRound forward through time. Does not modify this
object and will return a new object.

#### Parameters

##### increment

`number`

#### Returns

`CalendarRound`

***

### toString()

> **toString**(): `string`

Defined in: [cr/calendar-round.ts:172](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L172)

Render the CalendarRound cycle fullDate as a string

#### Returns

`string`

***

### validate()

> **validate**(): `void`

Defined in: [cr/calendar-round.ts:60](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/calendar-round.ts#L60)

Validate that the Calendar Round has a correct 260-day and Haab
configuration

#### Returns

`void`

#### Throws

If the Calendar Round is invalid.
