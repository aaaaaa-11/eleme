module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['off', 'windows'],
    'comma-dangle': 'off',
    'quote-props': 'off',
    'semi': 'off',
    'max-len': 'off',
    'space-before-function-paren': 'OFF',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { 'props': false }],
    'no-var': 'off',
    'for-direction': 'off',
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
