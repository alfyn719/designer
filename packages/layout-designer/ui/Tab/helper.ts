import type {
  GridTemplateTypeKey,
  SplitDirectionKey,
  SplitDirectionValue,
} from '../../model/create-grid-store/helper.type.ts'
import type { CSSProperties } from 'react'

import { SplitDirection } from '../../model/create-grid-store/helper.type.ts'

const THRESHOLD = 5

const OUT_TAB_XY = [-1, -1]

const NO_HOVER_TAB_INDEX = -1

const pickDirectionPoints = (width: number, height: number, threshold: number) => {
  const halfWidth = width / 2
  const leftStart = threshold
  const leftEnd = halfWidth - threshold
  const rightStart = halfWidth + threshold
  const rightEnd = width - threshold

  const halfHeight = height / 2
  const topStart = threshold
  const topEnd = halfHeight - threshold
  const bottomStart = halfHeight + threshold
  const bottomEnd = height - threshold

  return {
    leftStart,
    leftEnd,
    rightStart,
    rightEnd,
    topStart,
    topEnd,
    bottomStart,
    bottomEnd,
  }
}

type DirectionPoints = ReturnType<typeof pickDirectionPoints>

const mouseXY2Direction = (
  type: GridTemplateTypeKey,
  x: number,
  y: number,
  directionPoints: DirectionPoints,
): SplitDirectionValue | undefined => {
  const {
    leftStart,
    leftEnd,
    rightStart,
    rightEnd,
    topStart,
    topEnd,
    bottomStart,
    bottomEnd,
  } = directionPoints

  // split vertically
  if (type === 'Column' && x >= leftStart && x <= rightEnd) {
    if (x < leftEnd) {
      return SplitDirection.Left
    }

    if (x > rightStart) {
      return SplitDirection.Right
    }

    return SplitDirection.ColumnCenter
  }

  //   split horizontal
  if (type === 'Row' && y >= topStart && y <= bottomEnd) {
    if (y < topEnd) {
      return SplitDirection.Top
    }

    if (y > bottomStart) {
      return SplitDirection.Bottom
    }

    return SplitDirection.RowCenter
  }

  return undefined
}

export { THRESHOLD, OUT_TAB_XY, NO_HOVER_TAB_INDEX }

export { pickDirectionPoints, mouseXY2Direction }

export type { DirectionPoints }
