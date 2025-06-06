// 伪代码：一个用 fetch 或者内存 map 提供文件内容的插件

// const fsPlugin = {
//   name: 'fs',
//   setup(build) {
//     // 拦截任何相对路径
//     build.onResolve({ filter: /^\.\.?\// }, args => ({
//       namespace: 'user-code',
//       path: new URL(args.path, baseURL).toString(),
//     }))
//     // 真正加载源码
//     build.onLoad({ filter: /.*/, namespace: 'user-code' }, async (args) => {
//       // 你可以 fetch(args.path) 或者从一个 in-memory map 里取
//       const contents = await fetch(args.path).then(r => r.text())
//       return { contents, loader: 'js' }
//     })
//   },
// }
