import { createStore } from 'zustand'

// ======= switcher =======

interface Switcher {
  switch: boolean

  on: () => void
  off: () => void
  toggle: () => void
}

const switcher = (init: boolean) => createStore<Switcher>()(set => ({
  switch: init,

  on: () => set({ switch: true }),
  off: () => set({ switch: false }),
  toggle: () => set(state => ({ switch: !state.switch })),
}))

// ======= state machine =======

/**
 * 状态机一般包括：
 * 1. 状态
 * 2. 状态转移：判断内部条件后执行状态转移
 * 3. 状态转移条件：外部条件符合要求执行（状态转移）
 * 4. 状态转移行为：由 subscriber 实现，监听到状态转移时执行
 */

// TODO 状态机还没想好怎么做

export { switcher }
