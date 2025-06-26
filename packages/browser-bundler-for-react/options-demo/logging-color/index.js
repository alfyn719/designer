import * as esbuild from 'esbuild'

try {
  await esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: false,
    format: 'esm',
    outdir: 'dist',
    color: true,
    logLevel: 'error',
  })
}
catch (e) {
  console.log('error', e)
}
