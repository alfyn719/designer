import * as esbuild from 'esbuild'

import { PROD__REACT_SCHEDULER__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__REACT_SCHEDULER__,
  entryPoints: ['../../../node_modules/scheduler'],
  outfile: `react-browser-packages/${PROD__REACT_SCHEDULER__}.js`,
})
