/**
 * 获取入参：files 和 configs
 * 初始化 bundler
 * configs 检查
 * 执行打包流程
 */

// interface File_ {
//   path: string
//   content: string
// }
//
// const files: File_[] = [{
//   path: 'src/main.ts',
//   content: '',
// }]
//
// const bunder = (files: File_[], options) => {
//
// }

// bunder(files, {})

export default () => {
  console.log('xxx II')
}

interface File_ {
  path: string
  content: string
}

interface Editor {
  name: string
  version: string
  tags: string[]
  description: string
  files: File_[]
}

interface EditorOptions {

}
