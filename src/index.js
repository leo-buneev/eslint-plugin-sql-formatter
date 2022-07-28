// @flow

const format = require('./rules/format')

const rules = {
  format,
}

module.exports = {
  rules,
  rulesConfig: {
    format: 0,
  },
}
