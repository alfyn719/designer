import type { GridProps, GridState } from './index.type.ts'
import type { CSSProperties } from 'react'

import Color from 'color'
import { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { split, trackArea, unitArea } from './helper.ts'
import { GapType, GridTemplateType } from './helper.type.ts'

const colors = [
  '#ffccc7',
  '#ffd8bf',
  '#ffe7ba',
  '#fff1b8',
  '#ffffb8',
  '#f4ffb8',
  '#d9f7be',
  '#b5f5ec',
  '#bae0ff',
  '#d6e4ff',
  '#efdbff',
  '#ffd6e7',
].map(color => Color(color).fade(0.6).hexa())

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

  layout: {
    area1: [2, 1, 3, 3],
    area2: [1, 1, 3, 3],
    area3: [3, 2, 4, 4],
  },

  // ======= helper =======

  areaOrder: ['area2', 'area1', 'area3'],

  selectedTracks: {
    row: [],
    column: [],
  },

  colors,
}

const createGridStore = (initProps: Partial<GridProps>) =>
  createStore<GridState>()(
    devtools(
      immer((set, get) => ({
        // ======= props =======
        ...DEFAULT_PROPS,
        ...initProps,

        // ======= computed =======
        cssVariable() {
          const {
            rowGap,
            rowUnit,
            columnGap,
            columnUnit,
            gridTemplateRows,
            gridTemplateColumns,
          } = get()

          const variable = {
            '--rows': gridTemplateRows.join(' '),
            '--columns': gridTemplateColumns.join(' '),
            '--row-gap': `${rowGap}${rowUnit}`,
            '--column-gap': `${columnGap}${columnUnit}`,
          }

          return variable as CSSProperties
        },

        units() {
          const { gridTemplateRows, gridTemplateColumns } = get()

          const rowLineCount = gridTemplateRows.length + 1
          const columnLineCount = gridTemplateColumns.length + 1

          return unitArea({
            rowLineCount,
            columnLineCount,
            startRowGridLineNo: 1,
            startColumnGridLineNo: 1,
          })
        },

        trackGridArea() {
          const { gridTemplateRows, gridTemplateColumns } = get()

          const rowLineCount = gridTemplateRows.length + 1
          const columnLineCount = gridTemplateColumns.length + 1

          return trackArea({ rowLineCount, columnLineCount })
        },

        sortedArea() {
          const { layout, areaOrder } = get()

          return areaOrder.map(areaName => [areaName, layout[areaName]],
          )
        },

        addArea() {},

        // ======= actions =======

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
