import * as esbuild from 'esbuild'

import { PROD__REACT_DOM_CLIENT__ } from './constanst.js'
import prodBase from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  globalName: PROD__REACT_DOM_CLIENT__,
  entryPoints: ['../../../node_modules/react-dom/client.js'],
  outfile: `react-browser-packages/${PROD__REACT_DOM_CLIENT__}.js`,
})
