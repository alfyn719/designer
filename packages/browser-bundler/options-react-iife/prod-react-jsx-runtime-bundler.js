import * as esbuild from 'esbuild'
import prodBase, { PROD__REACT_JSX_DEV_RUNTIME__ } from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  outfile: `react-browser-packages/${PROD__REACT_JSX_DEV_RUNTIME__}.js`,
  globalName: PROD__REACT_JSX_DEV_RUNTIME__,
  entryPoints: ['../../../node_modules/react/jsx-runtime.js'],
})
