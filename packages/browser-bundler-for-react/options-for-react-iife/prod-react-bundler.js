import * as esbuild from 'esbuild'

import { PROD__REACT__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__REACT__,
  entryPoints: ['../../../node_modules/react/index.js'],
  outfile: `react-browser-packages/${PROD__REACT__}.js`,
})
