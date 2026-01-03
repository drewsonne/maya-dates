Defined in: [cr/component/numberCoefficient.ts:4](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L4)

## Implements

- [`ICoefficient`](../interfaces/ICoefficient.md)

## Constructors

### Constructor

> **new NumberCoefficient**(`coefficient`): `NumberCoefficient`

Defined in: [cr/component/numberCoefficient.ts:8](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L8)

#### Parameters

##### coefficient

`number`

#### Returns

`NumberCoefficient`

## Properties

### value

> **value**: `number`

Defined in: [cr/component/numberCoefficient.ts:6](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L6)

## Methods

### equal()

> **equal**(`coefficient`): `Boolean`

Defined in: [cr/component/numberCoefficient.ts:38](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L38)

#### Parameters

##### coefficient

[`ICoefficient`](../interfaces/ICoefficient.md)

#### Returns

`Boolean`

#### Implementation of

[`ICoefficient`](../interfaces/ICoefficient.md).[`equal`](../interfaces/ICoefficient.md#equal)

***

### increment()

> **increment**(): `NumberCoefficient`

Defined in: [cr/component/numberCoefficient.ts:26](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L26)

#### Returns

`NumberCoefficient`

***

### isIn()

> **isIn**(`validHaabCoeffs`): `Boolean`

Defined in: [cr/component/numberCoefficient.ts:30](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L30)

#### Parameters

##### validHaabCoeffs

`number`[]

#### Returns

`Boolean`

#### Implementation of

[`ICoefficient`](../interfaces/ICoefficient.md).[`isIn`](../interfaces/ICoefficient.md#isin)

***

### isWildcard()

> **isWildcard**(): `boolean`

Defined in: [cr/component/numberCoefficient.ts:12](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L12)

#### Returns

`boolean`

#### Implementation of

[`ICoefficient`](../interfaces/ICoefficient.md).[`isWildcard`](../interfaces/ICoefficient.md#iswildcard)

***

### match()

> **match**(`coefficient`): `Boolean`

Defined in: [cr/component/numberCoefficient.ts:45](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L45)

#### Parameters

##### coefficient

[`ICoefficient`](../interfaces/ICoefficient.md)

#### Returns

`Boolean`

#### Implementation of

[`ICoefficient`](../interfaces/ICoefficient.md).[`match`](../interfaces/ICoefficient.md#match)

***

### toString()

> **toString**(): `string`

Defined in: [cr/component/numberCoefficient.ts:34](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L34)

Returns a string representation of an object.

#### Returns

`string`

***

### validate()

> **validate**(): `boolean`

Defined in: [cr/component/numberCoefficient.ts:22](https://github.com/drewsonne/maya-dates/blob/f84c49dafb75284e80b5a05497dfa1f7ae014420/src/cr/component/numberCoefficient.ts#L22)

Validate the coefficient value. Override in context-specific usage.
By default, no validation is performed - specific calendar contexts
(Tzolk'in, Haab', etc.) should provide their own validation.

#### Returns

`boolean`

Always returns true in base implementation

#### Implementation of

[`ICoefficient`](../interfaces/ICoefficient.md).[`validate`](../interfaces/ICoefficient.md#validate)
