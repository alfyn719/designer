import antfu from '@antfu/eslint-config'
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  formatters: true,
  react: true,
  plugins: { reactCompiler },
  rules: {
    'no-console': 'warn',

    'antfu/top-level-function': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'reactCompiler/react-compiler': 'error',
  },
})
