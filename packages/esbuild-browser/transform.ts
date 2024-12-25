import type { SameShape, TransformOptions, TransformResult } from 'esbuild-wasm'

import * as esbuild from 'esbuild-wasm'

import { transform as base } from './configs/options'
import init from './init'

type Transform = <T extends TransformOptions>(input: string | Uint8Array, options?: SameShape<TransformOptions, T>) => Promise<TransformResult<T>>

const transform: Transform = async (
  input,
  options,
) => {
  await init()

  return await esbuild
    .transform(
      input,
      {
        ...base,
        ...options ?? {},
      },
    )
}

export default transform
