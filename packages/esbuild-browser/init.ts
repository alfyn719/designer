import * as esbuild from 'esbuild-wasm'

import { WASM_URL } from './configs'

const launcher = async (
  wasmURL = WASM_URL,
) =>
  await esbuild
    .initialize(
      {
        wasmURL,
        worker: true,
      },
    )

const switcher = async (
  boot: typeof launcher,
) => {
  if (window.IS_ESBUILD_INIT === 'INITIALIZED')
    return

  await boot()
  window.IS_ESBUILD_INIT = 'INITIALIZED'
}

const init = async () =>
  await switcher(launcher)

export default init
