import type { Plugin } from 'esbuild-wasm'
import type EComponent from '../EComponent.ts'

const filter = /^(\.\/).*(\.)(js|jsx|ts|tsx)$/

const pluginTsx = (
  component: EComponent,
  namespace: string,
): Plugin => {
  return {
    name: 'pluginJs',
    setup(build) {
      build.onResolve(
        { filter },

        (args) => {
          const { kind, path } = args

          if (kind === 'import-statement') {
            return {
              path,
              namespace,
              pluginData: component,
            }
          }
        },
      )

      build.onLoad(
        { filter },

        (args) => {
          const { path, pluginData } = args

          return {
            contents: pluginData.getRawCodeBy(path) as string,

            // .js | .jsx | .ts | .tsx 都可以用此 loader 处理
            loader: 'tsx',
          }
        },
      )
    },
  }
}

export default pluginTsx
