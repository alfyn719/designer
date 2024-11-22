import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginReact } from '@rsbuild/plugin-react'

const ReactCompilerConfig = {
  /* ... */
}

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginLess(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift([
          'babel-plugin-react-compiler',
          ReactCompilerConfig,
        ])
      },
    }),
  ],

  source: {
    decorators: {
      version: '2022-03',
    },
  },

  html: {
    title: 'designer',
  },
})
