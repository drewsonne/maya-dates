[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / WesternCalendar

# Abstract Class: WesternCalendar

Defined in: [lc/western/western.ts:8](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L8)

## Extended by

- [`GregorianCalendarDate`](GregorianCalendarDate.md)
- [`JulianCalendarDate`](JulianCalendarDate.md)

## Constructors

### Constructor

> **new WesternCalendar**(`julianDay`): `WesternCalendar`

Defined in: [lc/western/western.ts:18](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L18)

Store a date with reference to a Julian Day.

#### Parameters

##### julianDay

`number`

#### Returns

`WesternCalendar`

## Properties

### julianDay

> **julianDay**: `number`

Defined in: [lc/western/western.ts:9](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L9)

## Accessors

### date

#### Get Signature

> **get** **date**(): `MBCalendar`

Defined in: [lc/western/western.ts:34](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L34)

Get the calendar date representation.

##### Returns

`MBCalendar`

Calendar object with year, month, and day properties from moonbeams library

***

### day

#### Get Signature

> **get** **day**(): `number`

Defined in: [lc/western/western.ts:64](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L64)

Return the day of the month

##### Returns

`number`

***

### era

#### Get Signature

> **get** **era**(): `"BCE"` \| `"CE"`

Defined in: [lc/western/western.ts:72](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L72)

Return whether the date is the common era or before the common era.

##### Returns

`"BCE"` \| `"CE"`

***

### month

#### Get Signature

> **get** **month**(): `number`

Defined in: [lc/western/western.ts:56](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L56)

Return the month

##### Returns

`number`

***

### offset

#### Get Signature

> **get** `abstract` **offset**(): `number`

Defined in: [lc/western/western.ts:12](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L12)

##### Returns

`number`

***

### year

#### Get Signature

> **get** **year**(): `number`

Defined in: [lc/western/western.ts:45](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L45)

Return the year

##### Returns

`number`

## Methods

### isThreshold()

> **isThreshold**(): `boolean`

Defined in: [lc/western/western.ts:80](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L80)

Return true if this date is on the Julian/Gregorian threshold

#### Returns

`boolean`

***

### toString()

> **toString**(): `string`

Defined in: [lc/western/western.ts:88](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/lc/western/western.ts#L88)

Represent this date as a string with era markers.

#### Returns

`string`
