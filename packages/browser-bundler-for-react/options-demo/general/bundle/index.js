import * as esbuild from 'esbuild'

/**
 * 没有指定输出格式时，如果启用了捆绑（如下所述），esbuild 会为你选择一种输出格式；
 * 如果禁用了捆绑，esbuild 不会进行任何格式转换。
 */

esbuild.build({
  entryPoints: ['./src/app.js'],
  outdir: 'dist',
  format: 'esm',

  bundle: true,
})
