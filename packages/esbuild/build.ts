import type { BuildOptions, BuildResult, Plugin, SameShape } from 'esbuild-wasm'
import type EComponent from './EComponent.ts';

import * as esbuild from 'esbuild-wasm'

import { WASM_URL } from './configs'
import init from './init'

type Build = <T extends BuildOptions>(options: SameShape<BuildOptions, T>) => Promise<BuildResult<T>>

const modules = {
  'app.ts': `
    const name: string = 'YIKE'
  `,
}

class EBuild {
  static initialized: boolean = false

  private DEV: boolean = false

  constructor(wasmURL?: string) {
    this.init(wasmURL)
  }

  private async launcher(wasmURL = WASM_URL) {
    return await esbuild
      .initialize(
        {
          wasmURL,
          worker: true,
        },
      )
  }

  private init(wasmURL?: string) {
    if (EBuild.initialized)
      return

    this.launcher(wasmURL)
      .then(res => console.log('EBuild initialized', res))
  }

  createOptions(
    plugins: Array<Plugin>,
    entryPoints: Array<string> = ['index.tsx'],
    globalName: string = 'EDesigner.modules',
  ) {
    return {
      /**
       * context
       */
      plugins,
      globalName,
      entryPoints,

      /**
       * debug
       */
      minify: false,

      /**
       * base
       */
      bundle: true,
      platform: 'browser',
      format: 'iife',
      tsconfigRaw: `{
        "compilerOptions": {
          "jsx": "react"
        },
      }`,
    }
  }

  createPlugins() {
    return []
  }

  build(component: EComponent, container: string) {
    esbuild.build({})
  }
}

interface IBuild {
  files: Record<string, string>
  name: string
  version: string
}

new EBuild()

// 管理全局依赖
class YIDependencies {
  dependencies: Record<string, any>

  namespce: string

  constructor() {
  }

  scriptInject() {}

  getNamespace() {}
}

const entryPointResolver = (files, namespace: string): Plugin => {
  return {
    name: 'ENTRY_POINT_RESOLVER',
    setup: (build) => {
      const { initialOptions: { entryPoints: [entryPoint] } } = build

      build.onResolve({}, () => {

      })
    },
  }
}

const exampleOnResolvePluginLeft = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('LEFT START', build)
    })

    build.onResolve({ filter: /app.ts/ }, (args) => {
      return {
        namespace: 'cName',
        path: URL.createObjectURL(new File([modules['app.ts']], '', { type: 'application/javascript' })),
      }
    })

    build.onLoad({ filter: /^blob:/ }, (args) => {
      return { loader: 'tsx', contents: `
      import { useState } from 'react'
      
    const name: string = 'YIKE';
    console.log('name', name, useState);
  ` }
    })

    build.onEnd(() => {
      console.log('LEFT END')
    })
  },
}

const exampleOnResolvePluginRight = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('RIGHT START')
    })

    build.onResolve({ filter: /react/ }, (args) => {
      console.log('xxx', build)
      console.log('xxx', args)
      return { external: true }
    })

    build.onEnd(() => {
      console.log('RIGHT END')
    })
  },
}

const modx = {
  message1: 'hello',
  message2: 'everyone',
}

const handler2 = {
  set(target, prop, receiver) {
    console.log('xxx', target, prop, receiver)
  },
}

const proxy2 = new Proxy(modx, handler2)

window.modx = proxy2

const build: Build = async (
  options,
) => {
  await init()

  return await esbuild.build({
    entryPoints: ['app.ts'],

    plugins: [exampleOnResolvePluginLeft, exampleOnResolvePluginRight],
    minify: false,

    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'YIDesign.moduleName', //

    tsconfigRaw: `{
      "compilerOptions": {
        "jsx": "react"
      },
    }`,
  })
}

export default build
