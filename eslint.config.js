import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'no-console': 'warn',

    'import/order': [
      'error',
      {
        'groups': ['type', 'builtin', 'external', ['internal', 'parent', 'sibling', 'index', 'object'], 'unknown'],
        'pathGroups': [{ pattern: '@app/**', group: 'external', position: 'after' }],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ],

    'antfu/top-level-function': 'off',

    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': 'warn',
  },
})
