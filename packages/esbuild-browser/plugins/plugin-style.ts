import type { Plugin } from 'esbuild-wasm'
import type EComponent from '../EComponent.ts'
import lessc from '@tools/lessc'

const flagPath = (
  path: string,
  component: EComponent,
) => {
  const { name, version } = component
  const [_, filename] = path.split('./')

  return `./${name}.${version}.${filename}`
}

/**
 * filter path like:
 * ./**.css
 * ./**.module.css
 * ./**.less
 * ./**.module.less
 */
const filter = /^(\.\/).*(\.)(css|less)$/

const pluginStyle = (
  component: EComponent,
  namespace: string,
): Plugin => {
  return {
    name: 'pluginStyle',
    setup(build) {
      build.onResolve(
        { filter },

        (args) => {
          const { kind, path } = args

          if (kind === 'import-statement') {
            return {
              path: flagPath(path, component),
              namespace,
              pluginData: {
                component,
                rawPath: path,
              },
            }
          }
        },
      )

      build.onLoad(
        {
          filter: /(?:.css|.less)$/,
        },

        async (args) => {
          const { path, pluginData } = args

          const { component, rawPath } = pluginData

          let styleText = component.getRawCodeBy(rawPath)
          if (/.less$/.test(path)) {
            const { result } = await lessc(styleText)
            styleText = result ? result.css : ''
          }

          if (/(?:.module.css|.module.less)$/.test(path)) {
            return {
              contents: styleText,
              loader: 'local-css',
            }
          }

          return {
            contents: styleText,
            loader: 'css',
          }
        },
      )
    },
  }
}

export default pluginStyle
