Defined in: [factory/calendar-round.ts:17](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/calendar-round.ts#L17)

Parses Calendar Round strings into concrete objects.

## Example

```typescript
const cr = new CalendarRoundFactory().parse('4 Ajaw 8 Kumk\'u');
```

## Extends

- [`Factory`](Factory.md)

## Constructors

### Constructor

> **new CalendarRoundFactory**(): `CalendarRoundFactory`

Defined in: [factory/calendar-round.ts:21](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/calendar-round.ts#L21)

Defines the pattern describing a Calendar Round

#### Returns

`CalendarRoundFactory`

#### Overrides

[`Factory`](Factory.md).[`constructor`](Factory.md#constructor)

## Properties

### pattern

> **pattern**: `RegExp`

Defined in: [factory/base.ts:5](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/base.ts#L5)

#### Inherited from

[`Factory`](Factory.md).[`pattern`](Factory.md#pattern)

## Methods

### isNumberString()

> **isNumberString**(`potentialNumber`): `boolean`

Defined in: [factory/calendar-round.ts:52](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/calendar-round.ts#L52)

#### Parameters

##### potentialNumber

`string`

#### Returns

`boolean`

***

### parse()

> **parse**(`raw`): [`CalendarRound`](CalendarRound.md)

Defined in: [factory/calendar-round.ts:35](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/factory/calendar-round.ts#L35)

Parse a textual Calendar Round representation.

#### Parameters

##### raw

`string`

String containing the Calendar Round.

#### Returns

[`CalendarRound`](CalendarRound.md)

Parsed [CalendarRound](CalendarRound.md) instance.
