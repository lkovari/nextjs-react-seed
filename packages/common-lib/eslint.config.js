// @ts-check
import js from '@eslint/js'
import parser from '@typescript-eslint/parser'
import plugin from '@typescript-eslint/eslint-plugin'

/** @type {import("eslint").FlatConfig.Config[]} */ // ESLint v9+
export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  // opcionálisan: js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': plugin },
    rules: {
      ...plugin.configs.recommended.rules,
    },
  },
]