import type { Plugin } from 'esbuild-wasm'
import type EComponent from '../EComponent.ts'

// TODO 根据标识符，判断出是引用在线的组件：源码拉取，编译，放入 EModules 中

/**
 * 命名和解析规则：online::name:version
 */

const pluginOnline = (
  component: EComponent,
  globalName: string,
): Plugin => {
  return {
    name: 'pluginOnline',
    setup(build) {
      build.onResolve(
        { filter: /^(online::).*(:).*/ },

        (args) => {
          const { kind } = args

          const [namespace] = globalName.split('.')

          if (kind === 'import-statement') {
            // TODO fetch online component and compile and inject

            return {
              path: `${namespace}.moduleName`,
              external: true,
            }
          }
        },
      )
    },
  }
}

export default pluginOnline
