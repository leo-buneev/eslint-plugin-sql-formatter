/* eslint-disable no-template-curly-in-string */

module.exports = {
  invalid: [
    {
      code: `sql\`
IF EXISTS (
  SELECT
    1)
DROP TABLE test;
Select
  1
\``,
      errors: [
        {
          message: 'Format the query',
        },
      ],
      output: `sql\`
IF EXISTS (
  SELECT
    1
)
DROP TABLE
  test;

Select
  1
\``,
    },
    {
      code: `
function foo() {
  const q = sql\`
  SELECT
    1
\`
}
`,
      errors: [
        {
          message: 'Format the query',
        },
      ],
      options: [
        {
          ignoreSingleLine: false,
        },
      ],
      output: `
function foo() {
  const q = sql\`
    SELECT
      1
  \`
}
`,
    },
    {
      code: 'sql`SELECT 1`',
      errors: [
        {
          message: 'Format the query',
        },
      ],
      options: [
        {
          ignoreSingleLine: false,
        },
      ],
      output: 'sql`\n  SELECT\n    1\n`',
    },
    {
      code: 'sql`SELECT 2`',
      errors: [
        {
          message: 'Format the query',
        },
      ],
      options: [{ ignoreSingleLine: false, sqlFormatterConfig: { tabWidth: 4 } }],
      output: 'sql`\n  SELECT\n      2\n`',
    },
    {
      code: 'sql`SELECT 3`',
      errors: [
        {
          message: 'Format the query',
        },
      ],
      options: [],
      output: 'sql`\nSELECT\n  3\n`',
    },
    {
      code: "sql`SELECT ${'foo'} FROM ${'bar'}`",
      errors: [
        {
          message: 'Format the query',
        },
      ],
      options: [],
      output: "sql`\nSELECT\n  ${'foo'}\nFROM\n  ${'bar'}\n`",
    },
  ],
  valid: [
    {
      code: `sql\`
-- valid
IF EXISTS (
  SELECT
    1
)
DROP TABLE
  test;

Select
  1
\``,
    },
    {
      code: "sql`SELECT ${'foo'} FROM ${'bar'}`",
      options: [
        {
          ignoreSingleLine: true,
        },
      ],
    },
  ],
}
