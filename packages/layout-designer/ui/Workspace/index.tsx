import type { FullGestureState } from '@use-gesture/react'
import type { FC } from 'react'

import { useDrag } from '@use-gesture/react'
import cls from 'classnames'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'
import { toFixed } from '../../model/create-grid-store/helper.ts'
import Area from '../Area'
import Selecto from '../Selecto'
import Track from '../Track'
import Unit from '../Unit'

interface IWorkspaceProps {
  className?: string
}

const Workspace: FC<IWorkspaceProps> = (props) => {
  const { className } = props

  const colors = useGridContext(state => state.colors)

  const units = useGridContext(state => state.units())
  const areas = useGridContext(state => state.sortedArea())
  const [rowTrack, columnTrack] = useGridContext(state => state.trackGridArea())

  const setWorkspaceRect = useGridContext(state => state._setWorkspaceRect)
  const setSelectRect = useGridContext(state => state._setSelectRect)

  const [ref, workspaceRect] = useMeasure()

  useEffect(() => {
    setWorkspaceRect(workspaceRect)
  }, [workspaceRect])

  const pressStart = useRef<
    Omit<FullGestureState<'move'>, 'event'> & { event: PointerEvent } | undefined
  >()

  const bind = useDrag((state) => {
    const { initial, movement, xy } = state

    console.log('xxx', state)

    let x = toFixed(initial[0] - workspaceRect.x, 2)
    let y = toFixed(initial[1] - workspaceRect.y, 2)
    const width = toFixed(movement[0], 2)
    const height = toFixed(movement[1], 2)

    if (width < 0) {
      x = toFixed(xy[0] - workspaceRect.x, 2)
    }

    if (height < 0) {
      y = toFixed(xy[1] - workspaceRect.y, 2)
    }

    const selectRect = {
      left: x,
      top: y,
      x,
      y,
      width: Math.abs(width),
      height: Math.abs(height),
    }

    setSelectRect(selectRect)
  }, {})

  return (
    <div
      className={cls(className, styles.gridLayout)}
      ref={ref}
      {...bind()}
    >
      <Selecto />
      <Unit units={units} />
      <Area areas={areas} colors={colors} />
      <Track rowTrack={rowTrack} columnTrack={columnTrack} />
    </div>
  )
}

export default Workspace
