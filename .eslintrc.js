module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'operator-assignment': 'off',
    'linebreak-style': ["off", "windows"],
    "no-underscore-dangle": 'off',
    'no-irregular-whitespace': 'off',
    "prefer-destructuring": 'off',
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
  },
};
