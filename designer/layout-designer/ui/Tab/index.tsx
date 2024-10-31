import type {
  GridTemplateTypeKey,
} from '../../model/create-grid-store/helper.type.ts'
import type { FC } from 'react'

import cls from 'classnames'
import { useState } from 'react'
import useMeasure from 'react-use-measure'

import { NO_HOVER_TAB_INDEX, OUT_TAB_XY, THRESHOLD, mouseXY2Direction, pickDirectionPoints } from './helper.ts'
import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'

// 分割、删除、track 移动、尺寸调整
// TODO 键盘分割，tab 选中标签

interface ITabProps {
  className?: string
  type: GridTemplateTypeKey
  count: number
}

const Tab: FC<ITabProps> = (props) => {
  const {
    className,
    type,
    count,
  } = props

  const classNames = {
    Row: styles.row,
    Column: styles.column,
  }

  const [mouseEnterIndex, uMouseEnterIndex] = useState(NO_HOVER_TAB_INDEX)

  const [
    ref,
    { left, width, top, height },
  ] = useMeasure()

  const directionPoints = pickDirectionPoints(width, height, THRESHOLD)

  const [mouseXY, uMouseXY] = useState(OUT_TAB_XY)

  const direction = mouseXY2Direction(
    type,
    mouseXY[0],
    mouseXY[1],
    directionPoints,
  )

  // ======= action =======

  const splitGrid = useGridContext(
    state => state.splitGrid,
  )

  return (
    <div
      className={cls(className, styles.tabs, classNames[type])}
    >
      {
        Array
          .from({ length: count })
          .fill(0)
          .map((_, index) => (
            <div
              ref={index === mouseEnterIndex ? ref : null}
              key={index}
              className={styles.tab}
              onMouseEnter={() => uMouseEnterIndex(index)}
              onMouseMove={({ clientX, clientY }) =>
                uMouseXY([clientX - left, clientY - top])}
              onMouseLeave={() => {
                uMouseEnterIndex(NO_HOVER_TAB_INDEX)
                uMouseXY(OUT_TAB_XY)
              }}
              onDoubleClick={() => {
                if (!direction) {
                  return
                }

                splitGrid(type, index, direction)
              }}
            />
          ),
          )
      }
    </div>
  )
}

export default Tab
