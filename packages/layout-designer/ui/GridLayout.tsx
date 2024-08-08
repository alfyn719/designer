import type { CSSProperties } from 'react'

import Area from './Area'
import styles from './GridLayout.module.less'
import Track from './Track.tsx'
import Unit from './Unit.tsx'
import useGridContext from '../hooks/use-grid-context.ts'
import { trackArea } from '../model/create-grid-store/helper.ts'

const GridLayout = () => {
  const columnUnit = useGridContext(state => state.columnUnit)
  const rowUnit = useGridContext(state => state.rowUnit)
  const rowGap = useGridContext(state => state.rowGap)
  const columnGap = useGridContext(state => state.columnGap)

  const gridTemplateRows = useGridContext(state => state.gridTemplateRows)
  const gridTemplateColumns = useGridContext(
    state => state.gridTemplateColumns,
  )

  const layout = useGridContext(state => state.layout)

  const splitGrid = useGridContext(state => state.splitGrid)
  const deleteTrack = useGridContext(state => state.deleteTrack)
  const moveTrack = useGridContext(state => state.moveTrack)
  const editTrack = useGridContext(state => state.editTrack)
  const editGap = useGridContext(state => state.editGap)

  // ======= computed =======

  const rowCount = gridTemplateRows.length
  const columnCount = gridTemplateColumns.length

  const unitCount = rowCount * columnCount

  const [rowTrack, columnTrack] = trackArea({
    rowLineCount: rowCount + 2,
    columnLineCount: columnCount + 2,
  })

  const gridTemplateRowsString = gridTemplateRows.join(' ')
  const gridTemplateColumnsString = gridTemplateColumns.join(' ')

  const cssVariable = {
    '--rows': gridTemplateRowsString,
    '--columns': gridTemplateColumnsString,
    '--row-gap': `${rowGap}${rowUnit}`,
    '--column-gap': `${columnGap}${columnUnit}`,
  } as CSSProperties

  return (
    <div className={styles.gridLayout} style={cssVariable}>
      {/* <Unit /> */}
      {/* <Area /> */}
      {/* <Track /> */}

      <div className={styles.gridBase}>
        {new Array(unitCount).fill(0).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <div className={styles.gridArea}>
        {/* 根据区域生成元素数量 */}
        <div className={styles.gridAreaChild}>grid area child</div>
        <div className={styles.gridAreaChild2}>grid area child</div>
      </div>

      <div className={styles.gridTrack}>
        {rowTrack.map((track, index) => {
          return (
            <div
              key={index}
              onDoubleClick={() => {
                console.log('xxx', 'dbClick', index)
                splitGrid('Row', index)
              }}
              style={{ gridArea: track.join(' / ') }}
            />
          )
        })}
        {columnTrack.map((track, index) => {
          return <div key={index} style={{ gridArea: track.join(' / ') }} />
        })}
      </div>
    </div>
  )
}

export default GridLayout
