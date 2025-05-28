import * as esbuild from 'esbuild'
import prodBase, { PROD__REACT__ } from './prod-base.js'

esbuild.buildSync({
  ...prodBase,

  outfile: `react-browser-packages/${PROD__REACT__}.js`,
  globalName: PROD__REACT__,
  entryPoints: ['../../../node_modules/react/index.js'],
})
