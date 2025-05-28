const DEV__REACT__ = 'DEV__REACT__'
const DEV__REACT_DOM_CLIENT__ = 'DEV__REACT_DOM_CLIENT__'
const DEV__REACT_JSX_DEV_RUNTIME__ = 'DEV__REACT_JSX_DEV_RUNTIME__'

const devBase = {
  bundle: true,
  minify: false,
  format: 'iife',
  platform: 'browser',
  packages: 'external',

  define: { 'process.env.NODE_ENV': JSON.stringify('development') },

  alias: {
    'react': DEV__REACT__,
    'react-dom/client': DEV__REACT_DOM_CLIENT__,
    'react/jsx-dev-runtime': DEV__REACT_JSX_DEV_RUNTIME__,
  },

  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsxdev"
    }
  }`,

}

export default devBase

export {
  DEV__REACT__,
  DEV__REACT_DOM_CLIENT__,
  DEV__REACT_JSX_DEV_RUNTIME__,
}
