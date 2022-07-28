# eslint-plugin-sql-formatter

ESLint plugin that allows formatting of sql queries in *.sql files and template literals in *.js/*.ts files.
## Installation

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install `eslint-plugin-sql-formatter` plugin.

```sh
npm install eslint --save-dev
npm install eslint-plugin-sql --save-dev
```

## Configuration

1. Add `plugins` section and specify `sql-formatter` as a plugin.
1. Enable rules.

```json
{
  "plugins": [
    "sql"
  ],
  "rules": {
    "sql/format": [
      "error",
      {
        // Everything is optional.
        "ignoreSingleLine": true, // Do not format if sql query fits single line. Enabled by default.
        "sqlFormatterConfig": {
          // https://github.com/sql-formatter-org/sql-formatter#configuration-options
          
          "language": "mysql",
          // ... any other option from sql-formatter
        }
      }
    ],
  }
}

```