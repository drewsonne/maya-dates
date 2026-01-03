Defined in: [factory/gregorian.ts:7](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/gregorian.ts#L7)

Factory for creating [GregorianCalendarDate](GregorianCalendarDate.md) instances from Gregorian date strings.

## Constructors

### Constructor

> **new GregorianFactory**(): `GregorianFactory`

#### Returns

`GregorianFactory`

## Methods

### parse()

> **parse**(`gregorian`): [`GregorianCalendarDate`](GregorianCalendarDate.md)

Defined in: [factory/gregorian.ts:27](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/gregorian.ts#L27)

Parse a Gregorian calendar date string into a [GregorianCalendarDate](GregorianCalendarDate.md).

The input is expected to be in the form `DD/MM/YYYY`, optionally suffixed
with `" CE"` or `" BCE"` and/or an asterisk (`*`). For BCE dates, the
year component is converted to a negative year before being passed to
the moonbeams `calendarToJd` function.

The method calculates the appropriate julian day by:
1. Converting the Gregorian date to a julian day using moonbeams
2. Determining the offset needed based on the julian day
3. Storing the adjusted julian day in the GregorianCalendarDate

#### Parameters

##### gregorian

`string`

Gregorian date string to parse (e.g. `"01/01/0001 CE"`,
`"31/12/0001 BCE"`, or `"01/01/2000*"`).

#### Returns

[`GregorianCalendarDate`](GregorianCalendarDate.md)

A [GregorianCalendarDate](GregorianCalendarDate.md) instance representing the given
Gregorian date.

#### Throws

If the date string is invalid or malformed.
