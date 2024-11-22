import type { BuildOptions, Plugin } from 'esbuild-wasm'
import type EComponent from './EComponent.ts'
import * as esbuild from 'esbuild-wasm'
import { WASM_URL } from './configs'

import pluginEntryPoint from './plugins/plugin-entry-point.ts'
import pluginStyle from './plugins/plugin-style.ts'
import pluginTsx from './plugins/plugin-tsx.ts'

interface IProps {
  wasmURL?: string
  DEV?: boolean
}

class EBundler {
  static initialized: boolean = false

  DEV: boolean = false

  constructor(props: IProps) {
    const { wasmURL, DEV = false } = props

    this.init(wasmURL)
    this.DEV = DEV
  }

  private async launcher(wasmURL = WASM_URL) {
    await esbuild
      .initialize(
        {
          wasmURL,
          worker: true,
        },
      )

    EBundler.initialized = true
  }

  public init(wasmURL?: string) {
    if (EBundler.initialized)
      return

    this.launcher(wasmURL)
      .then(res => console.log('EBuild initialized', res))
  }

  createOptions(
    plugins: Array<Plugin>,
    entryPoints: Array<string>,
    globalName: string,
  ) {
    return {
      // context
      plugins,
      globalName,
      entryPoints,

      // debug
      minify: false,

      // base
      bundle: true,
      platform: 'browser',
      format: 'iife',
      tsconfigRaw: `{
        "compilerOptions": {
          "jsx": "react"
        },
      }`,
      loader: {
        '.tsx': 'tsx',
      },
      external: ['react'],
      outdir: '.',
    } as BuildOptions
  }

  createPlugins(
    component: EComponent,
    namespace: string,
    entrypoint: string,
  ) {
    return [
      pluginEntryPoint(component, namespace, entrypoint),
      pluginTsx(component, namespace),
      pluginStyle(component, namespace),
    ]
  }

  build(
    component: EComponent,
    globalName: string,
  ) {
    const { name, entryPoint } = component

    const plugins = this.createPlugins(
      component,
      name,
      entryPoint,
    )

    const options = this.createOptions(
      plugins,
      [entryPoint],
      globalName,
    )

    return esbuild.build(options)
  }

  static __require(path: string) {
    return window[path]
  }
}

export default EBundler
