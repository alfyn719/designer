import * as esbuild from 'esbuild'

import { DEV__REACT_DOM__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__REACT_DOM__,
  entryPoints: ['../../../node_modules/react-dom'],
  outfile: `react-browser-packages/${DEV__REACT_DOM__}.js`,
})
