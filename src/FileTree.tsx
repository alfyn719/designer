import { Tree } from 'react-arborist'

const data = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      { id: 'c1', name: 'General' },
      { id: 'c2', name: 'Random' },
      { id: 'c3', name: 'Open Source Projects' },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      { id: 'd1', name: 'Alice' },
      { id: 'd2', name: 'Bob' },
      { id: 'd3', name: 'Charlie' },
    ],
  },
]

function FileTree() {
  return <Tree initialData={data} />
}

export default FileTree

/**
 * 文件以：{ './xx/pathA/pathB': `content` } 对象存储
 * keys 以文件树的形式展示，支持各种文件操作；
 * `content` 以编辑器的形式展示，支持编辑器的各种功能，格式校验，补全等等；
 *
 * 文件对象保存在 git 仓库中，可以在浏览器端编译，编译产物可以在浏览器端被调用；
 */

/**
 * 文件树功能：
 * 1.展示
 * 2.层级修改
 * 3.重命名
 * 4.新建（文件夹，文件）
 * 5.删除
 * 6.onChange(EVENT_TYPE, {})
 * 7.数据处理：tree <-> keys
 * 8.回退、前进功能
 */
