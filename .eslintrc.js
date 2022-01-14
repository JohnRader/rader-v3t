/* eslint-disable @typescript-eslint/no-var-requires */
const typescriptLint = require('@typescript-eslint/eslint-plugin');
const eslintJest = require('eslint-plugin-jest');

class FilePatterns {
  static get typescript() {
    return [
      '*.test.ts',
      '*.ts',
      '*.vue',
      '*.d.ts',
    ];
  }

  static get vue() {
    return [
      '*.vue',
    ];
  }

  static get jest() {
    return [
      '**/*.test.ts',
    ];
  }

  static get lintFiles() {
    return [
      '**/.eslintrc.js',
    ];
  }

  static get definitionFiles() {
    return [
      '**/*.d.ts',
    ];
  }

  static get vite() {
    return [
      '**/*.config.ts',
      'main.ts',
    ];
  }

  static get all() {
    return [
      '**/*.[jt]s',
      ...FilePatterns.vue,
    ];
  }
}

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  plugins: [
    'import',
    '@typescript-eslint',
    'eslint-plugin-jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  overrides: [
    {
      files: FilePatterns.all,
      rules: {
        'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2, 100] }],
      },
    },
    {
      files: FilePatterns.typescript,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        tsconfigRootDir: './',
      },
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        ...typescriptLint.configs.recommended.rules,
        ...typescriptLint.configs.eslintRecommended,
        'linebreak-style': ['off'],
        'no-undef': ['off'], // you can safely turn this off because typescript compiler will crash otherwise, interfaces aren't recognised by eslint
        'no-shadow': ['off'], // you can safely turn this off because typescript compiler will crash otherwise, interfaces aren't recognised by eslint
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: [
            ...FilePatterns.vite,
            ...FilePatterns.jest,
          ],
        }],
        // note you must disable the base rule as it can report incorrect errors
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/ban-ts-comment': ['warn'],
        '@typescript-eslint/ban-types': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      },
    },
    {
      files: FilePatterns.definitionFiles,
      parserOptions: {
        parse: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
    {
      files: FilePatterns.vite,
      rules: {
        'import/extensions': ['off'],
        'import/no-unresolved': ['off'],
      },
    },
    {
      files: FilePatterns.vue,
      rules: {
        'class-methods-use-this': ['off'],
        'vue/valid-v-slot': ['error', {
          allowModifiers: true,
        }],
      },
    },
    {
      files: FilePatterns.jest,
      ...eslintJest.configs.recommended,
    },
  ],
};
