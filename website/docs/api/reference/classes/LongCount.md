Defined in: [lc/long-count.ts:37](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L37)

Long Count cycle.

The Long Count is a mixed-radix numeral system used by the ancient Maya to track
days elapsed since a creation-era base date. This implementation uses the standard
epoch per scholarly literature [R1, R2]:

**Epoch (Maya Day Number (MDN) = 0): 13.0.0.0.0 4 Ajaw 8 Kumk'u**

This date represents the completion of the 13th bak'tun in Maya cosmology and serves
as the anchor for all Long Count calculations and correlation with Western calendars.
MDN is analogous to Julian Day Number, but for the Maya calendar system.

**Units (mixed-radix system):**
- 1 k'in = 1 day
- 1 winal = 20 k'in
- 1 tun = 18 winal = 360 days
- 1 k'atun = 20 tun = 7,200 days
- 1 bak'tun = 20 k'atun = 144,000 days

## See

 - Reingold, Dershowitz, & Clamen (1993) [R1]
 - Martin & Skidmore (2012) [R2]

## Extends

- [`DistanceNumber`](DistanceNumber.md)

## Constructors

### Constructor

> **new LongCount**(...`cycles`): `LongCount`

Defined in: [lc/long-count.ts:219](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L219)

#### Parameters

##### cycles

...(`number` \| [`Wildcard`](Wildcard.md))[]

Components in the long count
(eg, K'in, Winal, Bak'tun, etc)

#### Returns

`LongCount`

#### Overrides

[`DistanceNumber`](DistanceNumber.md).[`constructor`](DistanceNumber.md#constructor)

## Properties

### comment

> **comment**: [`Comment`](Comment.md)

Defined in: [comment-wrapper.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L11)

Attached comment.

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`comment`](DistanceNumber.md#comment)

***

### datePattern

> **datePattern**: `RegExp`

Defined in: [lc/distance-number.ts:12](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L12)

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`datePattern`](DistanceNumber.md#datepattern)

***

### parts

> **parts**: (`number` \| [`Wildcard`](Wildcard.md))[]

Defined in: [lc/distance-number.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L11)

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`parts`](DistanceNumber.md#parts)

***

### sign

> **sign**: `number`

Defined in: [lc/distance-number.ts:13](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L13)

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`sign`](DistanceNumber.md#sign)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`bakTun`](DistanceNumber.md#baktun)

***

### gregorian

#### Get Signature

> **get** **gregorian**(): [`GregorianCalendarDate`](GregorianCalendarDate.md)

Defined in: [lc/long-count.ts:261](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L261)

Return a Gregorian representation of this long count date, offset by the correlation constant.

##### Returns

[`GregorianCalendarDate`](GregorianCalendarDate.md)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`isNegative`](DistanceNumber.md#isnegative)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`isPositive`](DistanceNumber.md#ispositive)

***

### julian

#### Get Signature

> **get** **julian**(): [`JulianCalendarDate`](JulianCalendarDate.md)

Defined in: [lc/long-count.ts:269](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L269)

Return a Julian representation of this long count date, offset by the correlation constant.

##### Returns

[`JulianCalendarDate`](JulianCalendarDate.md)

***

### julianDay

#### Get Signature

> **get** **julianDay**(): `number`

Defined in: [lc/long-count.ts:253](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L253)

Return a representation of this Long Count in Julian Days.

##### Returns

`number`

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`kalabtun`](DistanceNumber.md#kalabtun)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`kAtun`](DistanceNumber.md#katun)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`kIn`](DistanceNumber.md#kin)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`kinchiltun`](DistanceNumber.md#kinchiltun)

***

### lordOfNight

#### Get Signature

> **get** **lordOfNight**(): [`LordOfTheNight`](LordOfTheNight.md)

Defined in: [lc/long-count.ts:285](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L285)

##### Returns

[`LordOfTheNight`](LordOfTheNight.md)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`piktun`](DistanceNumber.md#piktun)

***

### sigParts

#### Get Signature

> **get** **sigParts**(): (`number` \| [`Wildcard`](Wildcard.md))[]

Defined in: [lc/distance-number.ts:120](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L120)

Only digits in the LC with significant digits

##### Returns

(`number` \| [`Wildcard`](Wildcard.md))[]

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`sigParts`](DistanceNumber.md#sigparts)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`tun`](DistanceNumber.md#tun)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`winal`](DistanceNumber.md#winal)

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

[`DistanceNumber`](DistanceNumber.md).[`appendComment`](DistanceNumber.md#appendcomment)

***

### asDistanceNumber()

> **asDistanceNumber**(): [`DistanceNumber`](DistanceNumber.md)

Defined in: [lc/long-count.ts:340](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L340)

Return this Long Count as a Distance Number

#### Returns

[`DistanceNumber`](DistanceNumber.md)

***

### buildCalendarRound()

> **buildCalendarRound**(): [`CalendarRound`](CalendarRound.md)

Defined in: [lc/long-count.ts:295](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L295)

#### Returns

[`CalendarRound`](CalendarRound.md)

***

### buildFullDate()

> **buildFullDate**(): [`FullDate`](FullDate.md)

Defined in: [lc/long-count.ts:305](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L305)

#### Returns

[`FullDate`](FullDate.md)

FullDate

***

### clone()

> **clone**(): `LongCount`

Defined in: [lc/long-count.ts:277](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L277)

Create a copy object of this long count fullDate

#### Returns

`LongCount`

#### Overrides

[`DistanceNumber`](DistanceNumber.md).[`clone`](DistanceNumber.md#clone)

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

[`DistanceNumber`](DistanceNumber.md).[`commentIsEqual`](DistanceNumber.md#commentisequal)

***

### equal()

> **equal**(`other`): `boolean`

Defined in: [lc/long-count.ts:351](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L351)

Compare two Long Count dates for equality.
Unlike DistanceNumber.equal(), this compares all parts, handling trailing zeros correctly.
This ensures dates with k'in=0 are compared correctly (e.g., 0.0.0.0.0 vs 0.2.12.13.0).

#### Parameters

##### other

[`IPart`](../interfaces/IPart.md)

#### Returns

`boolean`

#### Overrides

[`DistanceNumber`](DistanceNumber.md).[`equal`](DistanceNumber.md#equal)

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

[`DistanceNumber`](DistanceNumber.md).[`equalWithComment`](DistanceNumber.md#equalwithcomment)

***

### exactlyEqual()

> **exactlyEqual**(`other`): `boolean`

Defined in: [lc/distance-number.ts:107](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L107)

Given two long count dates, check if they are exactly equal

#### Parameters

##### other

[`DistanceNumber`](DistanceNumber.md)

#### Returns

`boolean`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`exactlyEqual`](DistanceNumber.md#exactlyequal)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`getDateSections`](DistanceNumber.md#getdatesections)

***

### getPosition()

> **getPosition**(): `number`

Defined in: [lc/distance-number.ts:332](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L332)

Count the number of days since 0.0.0.0.0 for this LC.

#### Returns

`number`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`getPosition`](DistanceNumber.md#getposition)

***

### gt()

> **gt**(`newLongCount`): `boolean`

Defined in: [lc/distance-number.ts:187](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L187)

Compare is this LC is less than the supplied LC.

#### Parameters

##### newLongCount

[`DistanceNumber`](DistanceNumber.md)

#### Returns

`boolean`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`gt`](DistanceNumber.md#gt)

***

### isPartial()

> **isPartial**(): `boolean`

Defined in: [lc/distance-number.ts:324](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L324)

Returns true if any of the positions in the Long Count have been assigned
a Wildcard object.

#### Returns

`boolean`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`isPartial`](DistanceNumber.md#ispartial)

***

### isValid()

> **isValid**(): `boolean`

Defined in: [lc/distance-number.ts:315](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L315)

Ensure the fullDate has only numbers and wildcards separated by points.

#### Returns

`boolean`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`isValid`](DistanceNumber.md#isvalid)

***

### lt()

> **lt**(`newLongCount`): `boolean`

Defined in: [lc/distance-number.ts:178](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L178)

Compare if this LC is greater than the supplied LC.

#### Parameters

##### newLongCount

[`DistanceNumber`](DistanceNumber.md)

#### Returns

`boolean`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`lt`](DistanceNumber.md#lt)

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

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`map`](DistanceNumber.md#map)

***

### minus()

> **minus**(`newLc`): [`LongcountSubtraction`](LongcountSubtraction.md)

Defined in: [lc/long-count.ts:329](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L329)

Return the difference between this Long Count and the supplied

#### Parameters

##### newLc

`LongCount`

#### Returns

[`LongcountSubtraction`](LongcountSubtraction.md)

#### Overrides

[`DistanceNumber`](DistanceNumber.md).[`minus`](DistanceNumber.md#minus)

***

### normalise()

> **normalise**(): [`DistanceNumber`](DistanceNumber.md)

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

[`DistanceNumber`](DistanceNumber.md)

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`normalise`](DistanceNumber.md#normalise)

***

### plus()

> **plus**(`newLc`): [`LongcountAddition`](LongcountAddition.md)

Defined in: [lc/long-count.ts:317](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L317)

Return the sum of this Long Count and the supplied

#### Parameters

##### newLc

`LongCount`

#### Returns

[`LongcountAddition`](LongcountAddition.md)

#### Overrides

[`DistanceNumber`](DistanceNumber.md).[`plus`](DistanceNumber.md#plus)

***

### resetComment()

> **resetComment**(): `this`

Defined in: [comment-wrapper.ts:20](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/comment-wrapper.ts#L20)

Reset the current comment back to an empty comment.

#### Returns

`this`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`resetComment`](DistanceNumber.md#resetcomment)

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

[`DistanceNumber`](DistanceNumber.md).[`setComment`](DistanceNumber.md#setcomment)

***

### setCorrelationConstant()

> **setCorrelationConstant**(`newConstant`): `LongCount`

Defined in: [lc/long-count.ts:244](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L244)

Chainable method to set the correlation constant

#### Parameters

##### newConstant

[`CorrelationConstant`](CorrelationConstant.md)

#### Returns

`LongCount`

***

### setDateSections()

> **setDateSections**(`index`, `newValue`): `LongCount`

Defined in: [lc/distance-number.ts:159](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L159)

Set specific column in Long Count fullDate

#### Parameters

##### index

`number`

##### newValue

`number` | [`Wildcard`](Wildcard.md)

#### Returns

`LongCount`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`setDateSections`](DistanceNumber.md#setdatesections)

***

### toString()

> **toString**(): `string`

Defined in: [lc/distance-number.ts:454](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/distance-number.ts#L454)

Convert the LongCount to a string and pad the sections of the fullDate

#### Returns

`string`

#### Inherited from

[`DistanceNumber`](DistanceNumber.md).[`toString`](DistanceNumber.md#tostring)

***

### fromDistanceNumber()

> `static` **fromDistanceNumber**(`dn`): `LongCount`

Defined in: [lc/long-count.ts:39](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L39)

#### Parameters

##### dn

[`DistanceNumber`](DistanceNumber.md)

#### Returns

`LongCount`

***

### fromGregorian()

> `static` **fromGregorian**(`gregorian`, `correlation`): `LongCount`

Defined in: [lc/long-count.ts:74](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L74)

Create a Long Count from a Gregorian date.

Accepts JavaScript Date objects or ISO 8601 date strings and converts them
to the corresponding Maya Long Count date using the specified correlation 
constant. The default correlation (584283, original GMT) is used unless 
specified otherwise.

**Important:** This method uses the proleptic Gregorian calendar for all dates,
including historical dates before the Gregorian calendar was adopted in 1582.
JavaScript Date objects always use the proleptic Gregorian calendar. Only the
date portion is used; any time components are ignored.

Supports ISO 8601 date format: "YYYY-MM-DD" (e.g., "2012-12-21")

#### Parameters

##### gregorian

JavaScript Date object or ISO 8601 date string

`string` | `Date`

##### correlation

[`CorrelationConstant`](CorrelationConstant.md) = `...`

Correlation constant for alignment (default: 584283 GMT)

#### Returns

`LongCount`

A Long Count instance representing the same date

#### Throws

If the date is invalid or results in a negative Maya Day Number

#### Example

```typescript
// From JavaScript Date object
const date = new Date('2012-12-21');
const lc1 = LongCount.fromGregorian(date);
console.log(lc1.toString()); // "13. 0. 0. 0. 0"

// From ISO 8601 date string
const lc2 = LongCount.fromGregorian('2012-12-21');
console.log(lc2.toString()); // "13. 0. 0. 0. 0"
```

***

### fromJulianDay()

> `static` **fromJulianDay**(`julianDay`, `correlation`): `LongCount`

Defined in: [lc/long-count.ts:132](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L132)

Create a Long Count from a Julian Day Number.

Converts a Julian Day Number to the corresponding Maya Long Count date using
the specified correlation constant. The Maya Day Number (MDN) is calculated
as: MDN = JDN - correlation_constant.

#### Parameters

##### julianDay

`number`

The Julian Day Number to convert

##### correlation

[`CorrelationConstant`](CorrelationConstant.md) = `...`

Correlation constant for alignment (default: 584283 GMT)

#### Returns

`LongCount`

A Long Count instance representing the same date

#### Throws

If the resulting Maya Day Number is negative

#### Example

```typescript
const lc = LongCount.fromJulianDay(2456283);
console.log(lc.toString()); // "13. 0. 0. 0. 0"
```

***

### fromMayanDayNumber()

> `static` **fromMayanDayNumber**(`mayanDayNumber`, `correlation?`): `LongCount`

Defined in: [lc/long-count.ts:162](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/lc/long-count.ts#L162)

Create a Long Count from a Maya Day Number (days since 0.0.0.0.0).

Converts a Maya Day Number (total days elapsed since the creation date)
into the corresponding Long Count notation using the mixed-radix system:
- k'in (base 20)
- winal (base 18)
- tun, k'atun, bak'tun (base 20)

#### Parameters

##### mayanDayNumber

`number`

Days elapsed since 0.0.0.0.0 (must be non-negative)

##### correlation?

[`CorrelationConstant`](CorrelationConstant.md)

Optional correlation constant to set on the result

#### Returns

`LongCount`

A Long Count instance representing the date

#### Throws

If mayanDayNumber is negative

#### Example

```typescript
const lc = LongCount.fromMayanDayNumber(1872000); // 13.0.0.0.0
console.log(lc.toString()); // "13. 0. 0. 0. 0"
```
