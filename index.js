'use strict'

const edit = require('kedit')
const xfn = require('xfn')

module.exports = xfn(
  {pluralArg: 1, pluralProp: 'all', pluralReturn: true},
  (collection, keychains, value, {overwrite = true, ...options} = {}) =>
    edit.all(collection, keychains, (old, found, cancel) => (!found || overwrite) ? value : cancel, options)
)
