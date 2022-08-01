const { generate } = require('astring')
const { format } = require('sql-formatter')

const create = context => {
  const pluginOptions = (context.options && context.options[0]) || {}

  const ignoreInline = pluginOptions.ignoreSingleLine
  const matchOuterIndentation = pluginOptions.matchOuterIndentation

  return {
    TemplateLiteral(node) {
      const sqlTagIsPresent = node.parent.tag && node.parent.tag.name === 'sql'

      if (!sqlTagIsPresent) {
        return
      }

      const magic = '"gajus-eslint-plugin-sql"'

      const literal = node.quasis
        .map(quasi => {
          return quasi.value.raw
        })
        .join(magic)

      if (ignoreInline && !literal.includes('\n')) {
        return
      }

      let formatted = format(literal.trim(), pluginOptions.sqlFormatterConfig)
      // console.log('????', formatted)
      formatted = `\n${formatted}\n`

      if (matchOuterIndentation) {
        const sourceCode = context.getSourceCode()
        const tagLoc = sourceCode.getLocFromIndex(node.parent.tag.range[0])
        const tagLine = sourceCode.lines[tagLoc.line - 1]
        let spaces = 0
        while (tagLine[spaces] === ' ') {
          spaces++
        }
        const formattedLines = formatted.split('\n')
        formatted = formattedLines
          .map((line, i) => {
            if (i === 0) return line
            if (i === formattedLines.length - 1) return ' '.repeat(spaces) + line
            return ' '.repeat(spaces + 2) + line
          })
          .join('\n')
      }

      if (formatted !== literal) {
        context.report({
          fix: fixer => {
            let final = formatted

            const expressionCount = node.expressions.length
            let index = 0

            while (index <= expressionCount - 1) {
              final = final.replace(magic, `\${${generate(node.expressions[index])}}`)

              index++
            }

            return fixer.replaceTextRange(
              [node.quasis[0].range[0], node.quasis[node.quasis.length - 1].range[1]],
              `\`${final}\``,
            )
          },
          message: 'Format the query',
          node,
        })
      }
    },
  }
}

module.exports = {
  create,
  meta: {
    docs: {
      description:
        'Matches queries in template literals. Warns when query formatting does not match the configured format (see Options).',
      url: 'https://github.com/gajus/eslint-plugin-sql#eslint-plugin-sql-rules-format',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          matchOuterIndentation: {
            default: true,
            type: 'boolean',
          },
          ignoreSingleLine: {
            default: true,
            type: 'boolean',
          },
          sqlFormatterConfig: {
            type: 'object',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
}
