// 开发代码
// 在线开发的其它组件
// 公共组件：antd，react
// 媒体文件：图片、音频；阈值控制内联，还是外挂：oss 和代码库中
import type { Plugin } from 'esbuild'

const relativePath: Plugin = {
  name: 'relative',
  setup(build) {
    // 相对路径 -> 开发代码：
    // 🈲 不能使用绝对路径
    build.onResolve({ filter: /^images\// }, (args) => {
      return {
        path: '',
      }
    })

    // 媒体文件：1.上传到 oss，2.内联

    // external 👇

    // 直接引用组件名，如：react，内建库，从全局环境取：built-in package
    // 💡 需要一个从 npm 拉取包，然后打包成 iife 的功能，支持未内建的库；单独做成功能，不由打包器提供
    // 实现细节：为了不改变开发习惯，依旧用原组件名，resolve 的时候做一层转换（1），再由 resolve 做 external（2）；

    // remote::version:name 在线开发的组件，external（require 时需要添加拉取代码，注入过程）
  },
}
