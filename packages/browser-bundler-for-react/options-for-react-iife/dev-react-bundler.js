import * as esbuild from 'esbuild'

import { DEV__REACT__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__REACT__,
  entryPoints: ['../../../node_modules/react/index.js'],
  outfile: `react-browser-packages/${DEV__REACT__}.js`,
})
