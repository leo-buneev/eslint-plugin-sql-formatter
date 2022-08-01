const path = require('path')
const format = require(path.join(__dirname, './rules/format.js'))

const rules = {
  format,
}

module.exports = {
  rules,
  rulesConfig: {
    format: 0,
  },
}
