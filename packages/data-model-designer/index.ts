import { createStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { switcher } from './src/control'

const storeDemo = createStore(
  subscribeWithSelector(set => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
  })),
)

export default storeDemo

/**
 * 监听的必要条件：
 * 1. 监听对象的 selector 或 path
 * 2. 监听对象的 callback
 */

/**
 * 数据模型与 UI 的绑定并组合
 * 数据与改变数据的方法
 */

export { switcher }
