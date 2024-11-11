import antfu from '@antfu/eslint-config'
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  formatters: true,
  react: true,
  plugins: { reactCompiler },
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

    'react-hooks/exhaustive-deps': 'off',

    'reactCompiler/react-compiler': 'error',
  },
})
