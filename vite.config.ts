import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
    },
  })],

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
