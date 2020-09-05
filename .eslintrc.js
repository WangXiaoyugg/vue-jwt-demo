module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'quotes': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    'prefer-const': 'off',
  },
};
