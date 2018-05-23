'use strict'

const assert = require('assert')
const set = require('.')

describe('set()', function () {
  it('should set value at Array index', function () {
    const arr = ['before']
    set(arr, 0, 'after')
    assert.strictEqual(arr[0], 'after')
  })

  it('should set value for Map key', function () {
    const map = new Map()
    set(map, 'key', 'value')
    assert.strictEqual(map.get('key'), 'value')
  })

  it('should set value for Object key', function () {
    const obj = {}
    set(obj, 'key', 'value')
    assert.strictEqual(obj.key, 'value')
  })

  it('should set value at Set index', function () {
    let s = new Set([1, 2, 3])
    set(s, 1, 5)
    s = Array.from(s.values())
    assert.strictEqual(s[0], 1)
    assert.strictEqual(s[1], 5)
    assert.strictEqual(s[2], 3)
  })

  it('should set value at Typed Array index', function () {
    const arr = new Int32Array(new ArrayBuffer(4))
    assert.strictEqual(arr[0], 0)
    set(arr, 0, 123)
    assert.strictEqual(arr[0], 123)
  })

  it('should return the new value', function () {
    assert.strictEqual(set({}, 'key', 'value'), 'value')
  })

  it('should throw TypeError attempting to set a property on non-object', function () {
    const obj = 'string'
    assert.throws(() => set(obj, 'key', 'value'), TypeError)
  })

  it('should throw TypeError attempting to set a property on nested non-object', function () {
    const obj = {sub: 'string'}
    assert.throws(() => set(obj, ['sub', 'key'], 'value'), TypeError)
  })

  it('should set nested value by Object key chain', function () {
    const obj = {sub: {}}
    set(obj, ['sub', 'key'], 'value')
    assert.strictEqual(obj.sub.key, 'value')
  })

  it('should create nested Objects if necessary', function () {
    const obj = {}
    set(obj, ['sub', 'key'], 'value')
    assert.strictEqual(typeof obj.sub, 'object')
    assert.strictEqual(obj.sub.key, 'value')
  })

  it('should leave an existing value intact if `overwrite` is false', function () {
    const obj = {}
    set(obj, ['sub', 'key'], 'old', {overwrite: false})
    set(obj, ['sub', 'key'], 'new', {overwrite: false})
    assert.strictEqual(obj.sub.key, 'old')
  })
})
