module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  env: {
    'node': true
  },
  rules: {
    'semi': 0,
    'arrow-parens': 0,
    'no-console': 0,
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
  }
}