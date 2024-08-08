import type { GridProps, GridState } from './index.type.ts'

import { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { split } from './helper.ts'
import { GapType, GridTemplateType } from './helper.type.ts'

const DEFAULT_PROPS: GridProps = {
  rowUnit: 'px',
  columnUnit: 'px',
  rowGap: 5,
  columnGap: 5,

  justifyContent: 'start',
  alignContent: 'start',

  justifyItems: 'start',
  alignItems: 'start',

  gridTemplateRows: ['1fr', '1fr', '1fr'],
  gridTemplateColumns: ['1fr', '1fr', '1fr'],

  layout: {},

  // ======= helper =======

  selectedTracks: {
    row: [],
    column: [],
  },
}

const createGridStore = (initProps: Partial<GridProps>) =>
  createStore<GridState>()(
    devtools(
      immer(set => ({
        ...DEFAULT_PROPS,
        ...initProps,

        splitGrid(type, index) {
          set((state) => {
            const target = state[GridTemplateType[type]]

            target.splice(index, 1, ...split(target[index]))
          })
        },

        deleteTrack(type, index) {
          set((state) => {
            const target = state[GridTemplateType[type]]

            target.splice(index, 1)
          })
        },

        moveTrack(type, from, to) {
          set((state) => {
            const target = state[GridTemplateType[type]]

            target.splice(from, 1, ...target.splice(to, 1, target[from]))
          })
        },

        editTrack(type, index, length) {
          set((state) => {
            const target = state[GridTemplateType[type]]

            target[index] = length
          })
        },

        editGap(type, length) {
          set((state) => {
            state[GapType[type]] = length
          })
        },
      })),
    ),
  )

export default createGridStore
