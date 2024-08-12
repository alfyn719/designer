import type { FC } from 'react'

import cls from 'classnames'

import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'
import Area from '../Area'
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

  return (
    <div className={cls(className, styles.gridLayout)}>
      <Unit units={units} />
      <Area areas={areas} colors={colors} />
      <Track rowTrack={rowTrack} columnTrack={columnTrack} />
    </div>
  )
}

export default Workspace
