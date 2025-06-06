import * as esbuild from 'esbuild'

import { DEV__REACT_JSX_DEV_RUNTIME__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__REACT_JSX_DEV_RUNTIME__,
  entryPoints: ['../../../node_modules/react/jsx-dev-runtime.js'],
  outfile: `react-browser-packages/${DEV__REACT_JSX_DEV_RUNTIME__}.js`,
})
