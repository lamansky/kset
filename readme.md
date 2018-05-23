# kset

Uses one or more keys to locate and set a value in a Map, Object, or other collection. Supports nesting, loose key matching, and more.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i kset
```

## API

The module exports an `set()` function that has one other function attached to it as a method: `set.all()`.

### `set()`

#### Parameters

1. Bindable: `collection` (Array, Map, Object, Set, Typed Array, or WeakMap): The key-value collection with the value to be set.
2. `keychain` (any, or array of any): The key at which to set `value`, or an array of nested keys. If the key or key chain does not exist, it will be created.
3. `value` (any): The new value.
4. Optional: Object argument:
    * `arrays` / `maps` / `sets` / `weakMaps` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set`/`WeakMap` (respectively).
    * `construct` (function or false): A callback which constructs a new collection in the process of generating a nested key chain that does not already exist. The function is passed a zero-based numeric index indicating the level of nesting, and is expected to return a new collection object. To disable keychain construction altogether, set this to `false`.
    * `elseReturn` (any): A value to return in the event that the set operation was unsuccessful. Only takes effect if no `elseThrow` is specified. Defaults to `undefined`.
    * `elseThrow` (Error or string): An error to be thrown in the event that the set operation was unsuccessful. A string will be wrapped in an `Error` object automatically.
    * `getType` (function): A callback which specifies the type of collection to be created in the process of generating a nested key chain that does not already exist. This callback is only used if `construct` is not set. The function is passed a zero-based numeric index indicating the level of nesting and is expected to return a class (`Object`, `Array`, `Map`, etc.) or the string name of a class (`'Object'`, `'Array'`, `'Map'`, etc.). If `getType` is not specified, the `types` argument will be used if present.
    * `get` (function): A callback which, if provided, will override the built-in code that fetches an individual key from a collection. Use this if you need to support collections whose custom APIs preclude the use of parameters like `maps`. The callback will be called with five arguments: the collection, the key, the options object, the fallback to return if the key is not found, and a callback for the built-in get behavior (to which your custom `get` callback can defer if it determines that it doesn’t need to override the default behavior after all).
    * `loose` (boolean): Whether or not to evaluate keys loosely (as defined by `looselyEquals`). Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `overwriteAncestors` (boolean): Whether or not to delete non-objects if necessary to resolve the `keychain`. If set to `false`, then the module will throw an error if `keychain` references a non-collection. Only applies if `elseThrow` is not set. Defaults to `false`.
    * `overwrite` (boolean): Whether or not to allow an existing value to be replaced with `value`. Defaults to `true`.
    * `preferStrict` (boolean): Only applies if `loose` is `true`. If `true`, then strictly-identical keys will be preferred over loosely-equivalent keys. Otherwise, the first loosely-equivalent key found will be used, even if a strictly-identical one comes later. Defaults to `false`.
    * `reverse` (boolean): Set to `true` to use the _last_ matching key instead of the first one. Only applies if `loose` is `true`. Defaults to `false`.
    * `set` (function): A callback which, if provided, will override the built-in code that sets the value of an individual key in a collection. Use this if you need to support collections whose custom APIs preclude the use of parameters like `maps`. The callback will be called with five arguments: the collection, the key, the new value, the options object, and a callback for the built-in set behavior (to which your custom `set` callback can defer if it determines that it doesn’t need to override the default behavior after all).
    * `type` or `types` (function, string, or array of functions/strings): A class, or its string name, that should be used to construct new collections if a nested key chain does not already exist. To specify different collection types for each level of nesting, put the types into an array. The `types` argument is used only if `construct` and `getType` are not specified. If neither argument is specified, newly-created nested collections will be of the same type as `collection`.

#### Return Values

* If no changes took place, returns `elseReturn` if set, otherwise `undefined`.
* If setting the value was successful, returns the new value.

#### Examples

##### Arrays

```javascript
const set = require('kset')

const arr = ['a', 'b', 'c']
set(arr, 0, 'A') // 'A'
arr // ['A', 'b', 'c']
```

##### Maps

```javascript
const set = require('kset')

const map = new Map([['key', 'old']])
set(map, 'key', 'new') // 'new'
map.get('key') // 'new'

const nestedMap = new Map()
set(nestedMap, ['key1', 'key2'], 'value') // 'value'
nestedMap.get('key1').get('key2') // 'value'
```

##### Objects

```javascript
const set = require('kset')

const obj = {key1: {}}
set(obj, ['key1', 'key2'], 'value') // 'value'
obj.key1.key2 // 'value'
```

### `set.all()`

Use this method if you want to set multiple keys to the same value at once.

#### Parameters

The parameters are the same as the main function, except that the second parameter is called `keychains` and accepts an array of `keychain` arguments.

#### Return Value

An array of new values corresponding to the array of keychains. Each element will be the new value if it was set, otherwise `elseReturn` or `undefined`.

#### Example

```javascript
const set = require('kset')

const obj = {a: 1, b: 2, c: 3}
set.all(obj, ['a', 'b'], 0) // [0, 0]

obj.a // 0
obj.b // 0
obj.c // 3
```

## Related

The “k” family of modules works on keyed/indexed collections.

* [khas](https://github.com/lamansky/khas)
* [kget](https://github.com/lamansky/kget)
* [kedit](https://github.com/lamansky/kedit)
* [kinc](https://github.com/lamansky/kinc)
* [kdel](https://github.com/lamansky/kdel)

The “v” family of modules works on any collection of values.

* [vhas](https://github.com/lamansky/vhas)
* [vget](https://github.com/lamansky/vget)
* [vsize](https://github.com/lamansky/vsize)
* [vadd](https://github.com/lamansky/vadd)
* [vdel](https://github.com/lamansky/vdel)
