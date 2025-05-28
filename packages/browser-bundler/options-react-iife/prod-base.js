const PROD__REACT__ = 'PROD__REACT__'
const PROD__REACT_DOM_CLIENT__ = 'PROD__REACT_DOM_CLIENT__'
const PROD__REACT_JSX_DEV_RUNTIME__ = 'PROD__REACT_JSX_DEV_RUNTIME__'

const prodBase = {
  bundle: true,
  minify: false,
  format: 'iife',
  platform: 'browser',
  packages: 'external',

  define: { 'process.env.NODE_ENV': JSON.stringify('production') },

  alias: {
    'react': PROD__REACT__,
    'react-dom/client': PROD__REACT_DOM_CLIENT__,
    'react/jsx-dev-runtime': PROD__REACT_JSX_DEV_RUNTIME__,
  },

  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsx"
    }
  }`,

}

export default prodBase

export {
  PROD__REACT__,
  PROD__REACT_DOM_CLIENT__,
  PROD__REACT_JSX_DEV_RUNTIME__,
}
