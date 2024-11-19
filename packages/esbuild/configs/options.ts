import type { TransformOptions } from 'esbuild-wasm'

const build = {

}

const transform: TransformOptions = {
  loader: 'tsx',
  charset: 'utf8',

  // 注入到全局环境中；
  // jsxDev: true,
  // jsx: 'automatic',
}

export { build, transform }
