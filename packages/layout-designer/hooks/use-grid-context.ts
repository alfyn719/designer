import type { GridState } from '../model/create-grid-store/index.type.ts'

import { useContext } from 'react'
import { useStore } from 'zustand'

import GridContext from '../model/grid-context.ts'

function useGridContext<T>(selector: (state: GridState) => T): T {
  const store = useContext(GridContext)

  if (!store) {
    throw new Error('Missing GridContext.Provider in the tree')
  }

  return useStore(store, selector)
}

export default useGridContext
