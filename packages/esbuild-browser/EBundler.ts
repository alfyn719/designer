import type { BuildOptions, Plugin } from 'esbuild-wasm'
import type EComponent from './EComponent.ts'
import * as esbuild from 'esbuild-wasm'
import { WASM_URL } from './configs'

import pluginEntryPoint from './plugins/plugin-entry-point.ts'
import pluginOnline from './plugins/plugin-online.ts'
import pluginStyle from './plugins/plugin-style.ts'
import pluginTsx from './plugins/plugin-tsx.ts'

interface IProps {
  wasmURL?: string
  DEV?: boolean
}

class EBundler {
  static initialized: boolean = false

  private readonly wasmURL: string

  DEV: boolean = false

  constructor(props: IProps) {
    const {
      wasmURL = WASM_URL,
      DEV = false,
    } = props

    this.wasmURL = wasmURL
    this.DEV = DEV
  }

  private launcher() {
    return esbuild.initialize(
      {
        wasmURL: this.wasmURL,
        worker: true,
      },
    )
  }

  private async init() {
    if (EBundler.initialized)
      return

    await this.launcher()

    EBundler.initialized = true

    console.log('EBuild is initialized')
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
    globalName: string,
  ) {
    return [
      pluginEntryPoint(component, namespace, entrypoint),
      pluginTsx(component, namespace),
      pluginStyle(component, namespace),
      pluginOnline(component, globalName),
    ]
  }

  async build(
    component: EComponent,
    globalName: string,
  ) {
    await this.init()

    const { name, entryPoint } = component

    const plugins = this.createPlugins(
      component,
      name,
      entryPoint,
      globalName,
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
