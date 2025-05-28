import * as esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/App.jsx'],
  // entryPoints: ['../../../../node_modules/react/jsx-runtime'],
  bundle: true,

  platform: 'browser',
  format: 'iife',
  globalName: 'ReactJSX',

  outdir: 'dist',
  minify: false,

  packages: 'external',
  // alias: {
  //   'react': 'React',
  //   'react/jsx-runtime': 'ReactJSXRuntime',
  // },

  // jsx: 'transform',
  // jsxDev: true,
  // jsxFactory: 'h',

  tsconfigRaw: `{
    "compilerOptions": {
      "jsx": "react-jsxdev"
    }
  }`,

  define: {
    // 'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
