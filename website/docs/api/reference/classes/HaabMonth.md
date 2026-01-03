Defined in: [cr/component/haabMonth.ts:68](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/haabMonth.ts#L68)

Haab month component of a Calendar Round date.

## Extends

- [`Cycle`](Cycle.md)

## Constructors

### Constructor

> **new HaabMonth**(`raw`): `HaabMonth`

Defined in: [cr/component/haabMonth.ts:72](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/haabMonth.ts#L72)

#### Parameters

##### raw

Name of the Haab month

`string` | [`Wildcard`](Wildcard.md)

#### Returns

`HaabMonth`

#### Overrides

`Cycle.constructor`

## Properties

### position

> **position**: `number`

Defined in: [cr/component/cycle.ts:14](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L14)

Absolute position within the linear cycle for this object.

#### Inherited from

[`Cycle`](Cycle.md).[`position`](Cycle.md#position)

## Methods

### isWildcard()

> **isWildcard**(): `boolean`

Defined in: [cr/component/base.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/base.ts#L11)

#### Returns

`boolean`

#### Inherited from

[`Cycle`](Cycle.md).[`isWildcard`](Cycle.md#iswildcard)

***

### next()

> **next**(): [`Cycle`](Cycle.md)

Defined in: [cr/component/cycle.ts:44](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L44)

Return the next object in the cycle

#### Returns

[`Cycle`](Cycle.md)

#### Inherited from

[`Cycle`](Cycle.md).[`next`](Cycle.md#next)

***

### shift()

> **shift**(`incremental`): [`Cycle`](Cycle.md)

Defined in: [cr/component/cycle.ts:52](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L52)

Move an incremental number of steps in the cycle, and return the object found there.

#### Parameters

##### incremental

`number`

The number of steps to move through in the cycle.

#### Returns

[`Cycle`](Cycle.md)

#### Inherited from

[`Cycle`](Cycle.md).[`shift`](Cycle.md#shift)

***

### toString()

> **toString**(): `string`

Defined in: [cr/component/cycle.ts:80](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L80)

Render this cycle object as a string

#### Returns

`string`

#### Inherited from

[`Cycle`](Cycle.md).[`toString`](Cycle.md#tostring)

***

### validate()

> **validate**(): `boolean`

Defined in: [cr/component/haabMonth.ts:81](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/haabMonth.ts#L81)

Ensure a Haab month name is defined, and that the month name is within the
set of allowable values.

#### Returns

`boolean`

#### Overrides

[`Cycle`](Cycle.md).[`validate`](Cycle.md#validate)
