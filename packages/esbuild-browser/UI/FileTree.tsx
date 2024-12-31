/**
 * 用于展示 EComponent 的 UI 部分，
 * 1. 组件名称的保存和修改；
 * 2. 版本切换；
 * 3. 版本信息展示；
 * 4. 右击选中为 entryPoint
 */

/**
 * 展示的信息：
 * 1. 组件名称
 * 2. 组件版本和所有版本号，以及各版本的更新日志
 * 3. 文件的关系和文件名
 * 4. 根据文件扩展名，展示对应的 icon
 * 5. 选中的文件高亮展示
 */

/**
 * 支持的操作：
 * 1. 修改组件名称
 * 2. 切换版本
 * 3. 更改文件的层级结构
 * 4. 更改文件名
 * 5. 选择打开的文件
 * 6. 扩展所选
 * 7. 全部收起
 * 8. 选中文件
 */

/**
 * 关于编辑器与文件树选中文件的联动，idea 没有做，需不需要做呢？
 */

const FileTree = () => {
  const compoent = {
    name: '',
    files: {
      './': '',
      '': 'xxx.tsx',
      '/abx': 'yyy.css',
    },
  }

  return (
    <>
      {/* 版本和版本信息 */}
      <div>version & info</div>

      <div>便捷操作：</div>

      <div>

        <div>component name</div>
        {/* 以文件夹形式展示文件间的关系和文件名 */}
        <div>Files</div>
      </div>

    </>

  )
}

export default FileTree
