[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / LongCountFactory

# Class: LongCountFactory

Defined in: [factory/long-count.ts:13](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/long-count.ts#L13)

Parses textual representations of Long Count dates.

## Example

```typescript
const lc = new LongCountFactory().parse('9.4.2.4.1');
```

## Extends

- [`Factory`](Factory.md)

## Constructors

### Constructor

> **new LongCountFactory**(): `LongCountFactory`

Defined in: [factory/long-count.ts:14](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/long-count.ts#L14)

#### Returns

`LongCountFactory`

#### Overrides

[`Factory`](Factory.md).[`constructor`](Factory.md#constructor)

## Properties

### pattern

> **pattern**: `RegExp`

Defined in: [factory/base.ts:5](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/base.ts#L5)

#### Inherited from

[`Factory`](Factory.md).[`pattern`](Factory.md#pattern)

## Methods

### parse()

> **parse**(`raw`): [`LongCount`](LongCount.md)

Defined in: [factory/long-count.ts:24](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/factory/long-count.ts#L24)

Parse a textual Long Count value.

#### Parameters

##### raw

`string`

String containing the Long Count.

#### Returns

[`LongCount`](LongCount.md)

Parsed [LongCount](LongCount.md) instance.
