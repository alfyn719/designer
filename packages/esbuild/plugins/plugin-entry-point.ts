import type { Plugin } from 'esbuild-wasm'
import type EComponent from '../EComponent'

const pluginEntryPoint = (
  component: EComponent,
  namespace: string,
  entryPoint: string,
): Plugin => {
  const filter = new RegExp(`${entryPoint}`)

  return {
    name: 'pluginEntryPoint',
    setup(build) {
      build.onResolve(
        { filter },

        (args) => {
          const { kind, path } = args

          if (kind === 'entry-point') {
            return {
              namespace,
              path,
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
            contents: pluginData.getRawCodeBy(path),
            loader: 'tsx',
          }
        },
      )
    },
  }
}

export default pluginEntryPoint
