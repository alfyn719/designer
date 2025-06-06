import * as esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/app.js'],
  bundle: false,
  format: 'iife',
  globalName: 'a.b.c.x',
  outdir: 'dist',
})
