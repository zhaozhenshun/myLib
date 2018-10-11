module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-debugger': 'error',
    'semi': 0,
    'quotes': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
