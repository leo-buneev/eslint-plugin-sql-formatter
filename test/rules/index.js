const { RuleTester } = require('eslint')
const _ = require('lodash')
const plugin = require('../../src')
const format = require('./assertions/format')

const ruleTester = new RuleTester({ parser: require.resolve('@babel/eslint-parser') })

ruleTester.run('format', plugin.rules['format'], format)
