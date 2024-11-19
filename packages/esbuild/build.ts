import type { BuildOptions, BuildResult, SameShape } from 'esbuild-wasm'

import * as esbuild from 'esbuild-wasm'

import init from './init'

type Build = <T extends BuildOptions>(options: SameShape<BuildOptions, T>) => Promise<BuildResult<T>>

const build: Build = async (
  options,
) => {
  await init()

  return await esbuild.build({
    entryPoints: ['app.ts'],
    bundle: true,
    plugins: [
      {
        name: 'resolve',
        setup(build) {
          build.onResolve({ filter: /(^app\.ts$)/ }, (args) => {
            console.log('xxx', build, args)
          })
        },
      },
    ],
  })
}

export default build
