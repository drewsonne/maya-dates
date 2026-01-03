Defined in: [cr/component/cycle.ts:6](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L6)

## Extends

- [`Base`](Base.md)

## Extended by

- [`HaabMonth`](HaabMonth.md)
- [`TzolkinDay`](TzolkinDay.md)

## Properties

### position

> **position**: `number`

Defined in: [cr/component/cycle.ts:14](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L14)

Absolute position within the linear cycle for this object.

## Methods

### isWildcard()

> **isWildcard**(): `boolean`

Defined in: [cr/component/base.ts:11](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/base.ts#L11)

#### Returns

`boolean`

#### Inherited from

[`Base`](Base.md).[`isWildcard`](Base.md#iswildcard)

***

### next()

> **next**(): `Cycle`

Defined in: [cr/component/cycle.ts:44](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L44)

Return the next object in the cycle

#### Returns

`Cycle`

***

### shift()

> **shift**(`incremental`): `Cycle`

Defined in: [cr/component/cycle.ts:52](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L52)

Move an incremental number of steps in the cycle, and return the object found there.

#### Parameters

##### incremental

`number`

The number of steps to move through in the cycle.

#### Returns

`Cycle`

***

### toString()

> **toString**(): `string`

Defined in: [cr/component/cycle.ts:80](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L80)

Render this cycle object as a string

#### Returns

`string`

#### Overrides

[`Base`](Base.md).[`toString`](Base.md#tostring)

***

### validate()

> `abstract` **validate**(): `boolean`

Defined in: [cr/component/cycle.ts:84](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/cycle.ts#L84)

#### Returns

`boolean`
