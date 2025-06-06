import * as esbuild from 'esbuild'

import { DEV__REACT_SCHEDULER__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__REACT_SCHEDULER__,
  entryPoints: ['../../../node_modules/scheduler'],
  outfile: `react-browser-packages/${DEV__REACT_SCHEDULER__}.js`,
})
