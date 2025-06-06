import * as esbuild from 'esbuild'

import { PROD__REACT_JSX_RUNTIME__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__REACT_JSX_RUNTIME__,
  entryPoints: ['../../../node_modules/react/jsx-runtime.js'],
  outfile: `react-browser-packages/${PROD__REACT_JSX_RUNTIME__}.js`,
})
