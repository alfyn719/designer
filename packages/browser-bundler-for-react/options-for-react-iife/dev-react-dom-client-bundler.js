import * as esbuild from 'esbuild'

import { DEV__REACT_DOM_CLIENT__ } from './constanst.js'
import devBase from './dev-base.js'

esbuild.buildSync({
  ...devBase,

  globalName: DEV__REACT_DOM_CLIENT__,
  entryPoints: ['../../../node_modules/react-dom/client.js'],
  outfile: `react-browser-packages/${DEV__REACT_DOM_CLIENT__}.js`,
})
