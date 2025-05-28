import type { BuildOptions } from 'esbuild-wasm'

/**
 * 关联配置：
 * bundle -> format
 * format-iife <- globalName
 * entryPoints >-< stdin 互斥
 */

/**
 * general options: https://esbuild.github.io/api/#general-options
 * unused options: Cancel、Live reload、Serve、Tsconfig、Watch
 */

// TODO use rebuild api

const GeneralOptions = {
  bundle: true,
  platforms: 'browser',
  tsconfigRaw: `{
  
  }`,
}

/**
 * input options: https://esbuild.github.io/api/#input
 * unused options: Stdin
 */

const InputOptions = {
  entryPoints: [],
  loader: {},
}

/**
 * output contents options: https://esbuild.github.io/api/#output-contents
 * not read options：Splitting
 * unused options: Line limit、
 * want use:
 *  Banner: 加打包日期和禁止修改这些提示
 *  Footer: 和 Banner 作用一样，加在末尾
 */

const buildIIFEOptions: BuildOptions = (path: string) => {
  // TODO 解析 iife 格式产物的结构和作用
  return {
    format: 'iife',
    globalName: path,
  }
}

const OutputContentsOptions = {
  charset: 'utf-8',
  legalComments: 'none',
}

/**
 * output location options: https://esbuild.github.io/api/#output-location
 * unused options: Allow overwrite、Asset names、Entry names、Chunk names、Out extension、
 *  Outbase、Outdir、Outfile、Public path
 */

const outputLocationOptions = {
  write: false,
}

/**
 * Path resolution options: https://esbuild.github.io/api/#path-resolution
 * unused options: Conditions、Main fields、Node paths、External、Preserve symlinks、
 *  Resolve extensions、Working directory
 * want use: Alias、
 */

const pathResolutionOptions: BuildOptions = {
  packages: 'external',
}

/**
 * Transformation resolution options: https://esbuild.github.io/api/#transformation
 * unused options:
 * want use:
 */

const transformationOptions = {

}

/**
 * Optimization resolution options: https://esbuild.github.io/api/#optimization
 * unused options:
 * want use:
 */

const optimizationOptions = {}

/*

5 Transformation:
JSX
JSX dev
JSX factory
JSX fragment
JSX import source
JSX side effects
Supported
Target

4 Optimization:
Define
Drop
Drop labels
Ignore annotations
Inject
Keep names
Mangle props
Minify
Pure
Tree shaking

3 Source maps:
Source root
Sourcefile
Sourcemap
Sources content

2 Build metadata:
Analyze
Metafile

1 Logging:
Color
Format messages
Log level
Log limit
Log override

*/

const defaultConfig: BuildOptions = {
  format: 'iife',

}

export default defaultConfig
