import * as esbuild from 'esbuild-wasm'
import COMPONENT_001 from './files.ts'

async function build() {
  return esbuild.build({
    entryPoints: ['./index.tsx'],
    bundle: true,
    color: true,
    tsconfigRaw: ``,
    plugins: [{
      name: 'xxx',
      setup(build) {
        build.onResolve({ filter: /^.\/index.tsx$/ }, (args) => {
          return { path: './index.tsx', namespace: 'built-in' }
        })

        build.onLoad({ filter: /^.\/index.tsx$/, namespace: 'built-in' }, (args) => {
          return {
            contents: COMPONENT_001['./index.tsx'],
            loader: 'tsx',
          }
        })
      },
    }],
  })
}

export default build
