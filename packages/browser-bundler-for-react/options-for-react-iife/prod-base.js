import {
  PROD__REACT__,
  PROD__REACT_DOM__,
  PROD__REACT_DOM_CLIENT__,
  PROD__REACT_JSX_RUNTIME__,

  PROD__REACT_SCHEDULER__,
} from './constanst.js'

const prodBase = {
  bundle: true,
  minify: true,
  format: 'iife',
  treeShaking: true,
  platform: 'browser',
  packages: 'external',

  define: { 'process.env.NODE_ENV': JSON.stringify('production') },

  alias: {
    'react': PROD__REACT__,
    'react-dom': PROD__REACT_DOM__,
    'react-dom/client': PROD__REACT_DOM_CLIENT__,
    'react/jsx-runtime': PROD__REACT_JSX_RUNTIME__,
    'scheduler': PROD__REACT_SCHEDULER__,
  },

  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsx"
    }
  }`,

}

export default prodBase
