import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import importPluginX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig } from 'eslint/config';

import stylistic from '@stylistic/eslint-plugin';

import airbnbExtended from 'eslint-config-airbnb-extended';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...airbnbExtended.configs.base.all,
      ...airbnbExtended.configs.react.all,
      eslintPluginPrettier,
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'import-x': importPluginX,
      'jsx-a11y': jsxA11y,
      '@stylistic': stylistic,
    },
    rules: {
      'max-lines-per-function': [
        'error',
        { max: 40, skipComments: true, skipBlankLines: true },
      ],

      'no-magic-numbers': [
        'error',
        { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true },
      ],
      'react/require-default-props': 'off',

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react-compiler/react-compiler': 'error',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      '@typescript-eslint/no-explicit-any': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
