import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true,

            /**
             * Hook called after all declaration files are written.
             * generate .d.cts by emitted .d.ts
             */
            afterBuild(emittedFiles) {
                emittedFiles
                    .entries()
                    .forEach(([path, content]) =>
                        writeFileSync(path.replace('.d.ts', '.umd.d.cts'), content),
                    )
            },
        }),
    ],

    build: {
        outDir: 'dist',
        lib: {
            entry: ['./src/index.ts'],

            /**
             * name is the exposed global variable and
             * is required when formats includes 'umd' or 'iife'.
             */
            name: 'pipeline',

            /**
             * If the package.json does not contain "type": "module",
             * Vite will generate different file extensions for Node.js compatibility.
             * .js will become .mjs and .cjs will become .js.
             */
            formats: ['es', 'umd'],

            /**
             * the proper extensions will be added
             */
            fileName: 'index',
        },
    },
})
