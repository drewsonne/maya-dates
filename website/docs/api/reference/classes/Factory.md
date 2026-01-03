[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / Factory

# Abstract Class: Factory

Defined in: [factory/base.ts:4](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/base.ts#L4)

An abstract class to handle the create of an object from a string

## Extended by

- [`LongCountFactory`](LongCountFactory.md)
- [`CalendarRoundFactory`](CalendarRoundFactory.md)

## Constructors

### Constructor

> **new Factory**(`pattern`): `Factory`

Defined in: [factory/base.ts:10](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/base.ts#L10)

Define properties to be override by sub-classes

#### Parameters

##### pattern

`RegExp`

#### Returns

`Factory`

## Properties

### pattern

> **pattern**: `RegExp`

Defined in: [factory/base.ts:5](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/base.ts#L5)
