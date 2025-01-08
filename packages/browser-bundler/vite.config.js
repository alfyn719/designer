import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { peerDependencies } from './package.json'

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      afterBuild(emittedFiles) {
        emittedFiles
          .entries()
          .forEach(([path, content]) =>
            writeFileSync(path.replace('.d.ts', '.d.cts'), content),
          )
      },
    }),
  ],

  build: {
    outDir: 'dist',
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
    lib: {
      entry: ['./src/index.ts'],
      name: 'browser-bundler',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
})
