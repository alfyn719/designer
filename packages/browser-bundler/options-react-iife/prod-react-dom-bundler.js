import * as esbuild from 'esbuild'
import prodBase, { PROD__REACT_DOM_CLIENT__ } from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  outfile: `react-browser-packages/${PROD__REACT_DOM_CLIENT__}.js`,
  globalName: PROD__REACT_DOM_CLIENT__,
  entryPoints: ['../../../node_modules/react-dom/index.js'],
})
