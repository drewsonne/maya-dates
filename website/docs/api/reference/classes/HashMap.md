[**@drewsonne/maya-dates**](../index.md)

***

[@drewsonne/maya-dates](../index.md) / HashMap

# Class: HashMap

Defined in: [structs/hashMap.ts:4](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L4)

Simple bidirectional map used to translate between indexes and values.

## Constructors

### Constructor

> **new HashMap**(`raw`): `HashMap`

Defined in: [structs/hashMap.ts:13](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L13)

Create a new map from an array of values.

#### Parameters

##### raw

(`string` \| `undefined`)[]

Array where the index represents the lookup index.

#### Returns

`HashMap`

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [structs/hashMap.ts:51](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L51)

Number of items stored in the map.

##### Returns

`number`

## Methods

### getIndex()

> **getIndex**(`value`): `number`

Defined in: [structs/hashMap.ts:37](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L37)

Retrieve an index by value.

#### Parameters

##### value

`string`

#### Returns

`number`

***

### getValue()

> **getValue**(`index`): `string` \| `undefined`

Defined in: [structs/hashMap.ts:30](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L30)

Retrieve a value by index.

#### Parameters

##### index

`number`

#### Returns

`string` \| `undefined`

***

### includes()

> **includes**(`value`): `boolean`

Defined in: [structs/hashMap.ts:44](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L44)

Test if a value exists within the map.

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### toString()

> **toString**(): `string`

Defined in: [structs/hashMap.ts:58](https://github.com/drewsonne/maya-dates/blob/35f5b6583e23bec82bade22c44896b75f1302950/src/structs/hashMap.ts#L58)

Convert the map to a string representation.

#### Returns

`string`
