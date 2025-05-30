import * as esbuild from 'esbuild'

import { PROD__SCHEDULER__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__SCHEDULER__,
  entryPoints: ['../../../node_modules/scheduler'],
  outfile: `react-browser-packages/${PROD__SCHEDULER__}.js`,
})
