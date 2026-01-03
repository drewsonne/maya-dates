[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / TzolkinDay

# Class: TzolkinDay

Defined in: [cr/component/tzolkinDay.ts:70](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/tzolkinDay.ts#L70)

Describes only the day component of a 260-day cycle

## Extends

- [`Cycle`](Cycle.md)

## Constructors

### Constructor

> **new TzolkinDay**(`newName`): `TzolkinDay`

Defined in: [cr/component/tzolkinDay.ts:75](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/tzolkinDay.ts#L75)

#### Parameters

##### newName

Name or position of the 260-day cycle day

`string` | `number` | [`Wildcard`](Wildcard.md)

#### Returns

`TzolkinDay`

#### Overrides

`Cycle.constructor`

## Properties

### position

> **position**: `number`

Defined in: [cr/component/cycle.ts:14](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/cycle.ts#L14)

Absolute position within the linear cycle for this object.

#### Inherited from

[`Cycle`](Cycle.md).[`position`](Cycle.md#position)

## Methods

### isWildcard()

> **isWildcard**(): `boolean`

Defined in: [cr/component/base.ts:11](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/base.ts#L11)

#### Returns

`boolean`

#### Inherited from

[`Cycle`](Cycle.md).[`isWildcard`](Cycle.md#iswildcard)

***

### next()

> **next**(): [`Cycle`](Cycle.md)

Defined in: [cr/component/cycle.ts:44](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/cycle.ts#L44)

Return the next object in the cycle

#### Returns

[`Cycle`](Cycle.md)

#### Inherited from

[`Cycle`](Cycle.md).[`next`](Cycle.md#next)

***

### shift()

> **shift**(`incremental`): [`Cycle`](Cycle.md)

Defined in: [cr/component/cycle.ts:52](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/cycle.ts#L52)

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

Defined in: [cr/component/cycle.ts:80](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/cycle.ts#L80)

Render this cycle object as a string

#### Returns

`string`

#### Inherited from

[`Cycle`](Cycle.md).[`toString`](Cycle.md#tostring)

***

### validate()

> **validate**(): `boolean`

Defined in: [cr/component/tzolkinDay.ts:83](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/cr/component/tzolkinDay.ts#L83)

Ensure the Tzolk'in day name is defined and is within the list of
acceptable day names.

#### Returns

`boolean`

#### Overrides

[`Cycle`](Cycle.md).[`validate`](Cycle.md#validate)
