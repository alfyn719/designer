/**
 * 数据源的数据模型
 * 数据源的结构
 * 数据源的操作方法：新增，删除，修改，查询
 */

import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const operateByApiConfig = () => {

}

interface DataModel {
  data: any[]

  add: (data: any) => void
  remove: (data: any) => void
  update: (data: any) => void
  query: (data: any) => void
}

/**
 * 数据源初始化后，再用 query 值来初始化数据模型
 * 使用乐观更新，数据模型更新后，再调用数据源的 query 方法
 */

interface DataSource {
  data: any[]
}

const dataModel = (dataSource: DataSource) => createStore<DataModel>()(
  immer(set => ({
    data: dataSource.data,

    add: (data: any) => set(state => ({ data: [...state.data, data] })),
    remove: (data: any) => set(state => ({ data: state.data.filter(item => item !== data) })),
    update: (data: any) => set(state => ({ data: state.data.map(item => item === data ? data : item) })),
    query: (data: any) => set(state => ({ data: state.data.filter(item => item === data) })),
  })),
)

export { dataModel }
