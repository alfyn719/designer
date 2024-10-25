import { defineConfig } from '@rsbuild/core'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginLess(),
  ],
  source: {
    decorators: {
      version: '2022-03',
    },
  },
})
