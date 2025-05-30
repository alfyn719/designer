import * as esbuild from 'esbuild'

import { DEV__SCHEDULER__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__SCHEDULER__,
  entryPoints: ['../../../node_modules/scheduler'],
  outfile: `react-browser-packages/${DEV__SCHEDULER__}.js`,
})
