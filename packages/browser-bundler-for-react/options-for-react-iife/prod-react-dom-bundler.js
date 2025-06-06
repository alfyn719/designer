import * as esbuild from 'esbuild'

import { PROD__REACT_DOM__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__REACT_DOM__,
  entryPoints: ['../../../node_modules/react-dom'],
  outfile: `react-browser-packages/${PROD__REACT_DOM__}.js`,
})
