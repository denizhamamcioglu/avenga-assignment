import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  globalIgnores([
    '.vscode',
    '.vs',
    'allure-results',
    'docker-playwright-report',
    'logs',
    'node_modules',
    'playwright-report',
    'resources',
    'test-results',
    'local.logs',
  ]),

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // ✅ Recommended TS rules
  ...tseslint.configs.recommended,

  // ✅ Override JUST the "no-explicit-any" rule AFTER spreading
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);