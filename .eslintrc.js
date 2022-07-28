module.exports = {
  root: true,
  ignorePatterns: ['**/dist/**/*'],
  extends: ['plugin:tyrecheck/recommended'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'warn', { allow: ['warn', 'error', 'info'] }],
  },
}
