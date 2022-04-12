module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended'
  ],
  plugins: ['import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/comma-dangle': 'off'
  }
};
