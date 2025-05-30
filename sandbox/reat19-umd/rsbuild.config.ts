import process from 'node:process'

import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

const devExternals = {
  'react': 'DEV__REACT__',
  'react-dom': 'DEV__REACT_DOM__',
  'react-dom/client': 'DEV__REACT_DOM_CLIENT__',
  'react/jsx-runtime': 'DEV__REACT_JSX_DEV_RUNTIME__',
  'scheduler': 'DEV__SCHEDULER__',
}

const prodExternals = {
  'react': 'PROD__REACT__',
  'react-dom': 'PROD__REACT_DOM__',
  'react-dom/client': 'PROD__REACT_DOM_CLIENT__',
  'react/jsx-runtime': 'PROD__REACT_JSX_RUNTIME__',
  'scheduler': 'PROD__SCHEDULER__',
}

const devTags = [
  { tag: 'script', attrs: { src: './DEV__SCHEDULER__.js' } },
  { tag: 'script', attrs: { src: './DEV__REACT__.js' } },
  { tag: 'script', attrs: { src: './DEV__REACT_DOM__.js' } },
  { tag: 'script', attrs: { src: './DEV__REACT_DOM_CLIENT__.js' } },
  { tag: 'script', attrs: { src: './DEV__REACT_JSX_DEV_RUNTIME__.js' } },
]

const prodTags = [
  { tag: 'script', attrs: { src: './PROD__SCHEDULER__.js' } },
  { tag: 'script', attrs: { src: './PROD__REACT__.js' } },
  { tag: 'script', attrs: { src: './PROD__REACT_DOM__.js' } },
  { tag: 'script', attrs: { src: './PROD__REACT_DOM_CLIENT__.js' } },
  { tag: 'script', attrs: { src: './PROD__REACT_JSX_RUNTIME__.js' } },
]

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    externals: process.env.NODE_ENV === 'production' ? prodExternals : devExternals,
    minify: false,
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-module',
    },
  },
  html: {
    tags: [
      {
        tag: 'script',
        children: `
          function require(name) {
            return window[name]
          }
        `,
      },
      ...(process.env.NODE_ENV === 'production' ? prodTags : devTags),
    ],
  },
})
