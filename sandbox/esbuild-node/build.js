console.time('build')

require('esbuild').build({
  entryPoints: ['./index.tsx'],
  bundle: true,
  platform: 'browser',
  outfile: 'build/main.js',
  sourcemap: false,
  format: 'esm',
  external: ['lodash-es'],
  loader: {
    '.tsx': 'tsx',
    '.svg': 'dataurl',
    '.png': 'file',
    '.module.css': 'local-css',
  },
  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react"
    },
  }`,
}).then(() => {
  console.timeEnd('build')
})
