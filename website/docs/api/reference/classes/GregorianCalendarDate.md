[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / GregorianCalendarDate

# Class: GregorianCalendarDate

Defined in: [lc/western/gregorian.ts:50](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/gregorian.ts#L50)

Represent a Gregorian date.

## Extends

- [`WesternCalendar`](WesternCalendar.md)

## Constructors

### Constructor

> **new GregorianCalendarDate**(`julianDay`): `GregorianCalendarDate`

Defined in: [lc/western/western.ts:18](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L18)

Store a date with reference to a Julian Day.

#### Parameters

##### julianDay

`number`

#### Returns

`GregorianCalendarDate`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`constructor`](WesternCalendar.md#constructor)

## Properties

### julianDay

> **julianDay**: `number`

Defined in: [lc/western/western.ts:9](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L9)

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`julianDay`](WesternCalendar.md#julianday)

## Accessors

### date

#### Get Signature

> **get** **date**(): `MBCalendar`

Defined in: [lc/western/western.ts:34](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L34)

Get the calendar date representation.

##### Returns

`MBCalendar`

Calendar object with year, month, and day properties from moonbeams library

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`date`](WesternCalendar.md#date)

***

### day

#### Get Signature

> **get** **day**(): `number`

Defined in: [lc/western/western.ts:64](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L64)

Return the day of the month

##### Returns

`number`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`day`](WesternCalendar.md#day)

***

### era

#### Get Signature

> **get** **era**(): `"BCE"` \| `"CE"`

Defined in: [lc/western/western.ts:72](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L72)

Return whether the date is the common era or before the common era.

##### Returns

`"BCE"` \| `"CE"`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`era`](WesternCalendar.md#era)

***

### month

#### Get Signature

> **get** **month**(): `number`

Defined in: [lc/western/western.ts:56](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L56)

Return the month

##### Returns

`number`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`month`](WesternCalendar.md#month)

***

### offset

#### Get Signature

> **get** **offset**(): `number`

Defined in: [lc/western/gregorian.ts:55](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/gregorian.ts#L55)

Handle the sliding offset between gregorian and julian dates

##### Returns

`number`

#### Overrides

[`WesternCalendar`](WesternCalendar.md).[`offset`](WesternCalendar.md#offset)

***

### year

#### Get Signature

> **get** **year**(): `number`

Defined in: [lc/western/western.ts:45](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L45)

Return the year

##### Returns

`number`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`year`](WesternCalendar.md#year)

## Methods

### isThreshold()

> **isThreshold**(): `boolean`

Defined in: [lc/western/western.ts:80](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L80)

Return true if this date is on the Julian/Gregorian threshold

#### Returns

`boolean`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`isThreshold`](WesternCalendar.md#isthreshold)

***

### toString()

> **toString**(): `string`

Defined in: [lc/western/western.ts:88](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L88)

Represent this date as a string with era markers.

#### Returns

`string`

#### Inherited from

[`WesternCalendar`](WesternCalendar.md).[`toString`](WesternCalendar.md#tostring)
