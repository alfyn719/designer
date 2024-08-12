import type { GridArea } from '../../model/create-grid-store/index.type.ts'
import type { FC } from 'react'

import styles from './index.module.less'

interface ITrackProps {
  rowTrack: GridArea[]
  columnTrack: GridArea[]
}

// TODO track 切分和删除动效，虽然操作不在 track 上，但动效体验可以放在 track 上

const Index: FC<ITrackProps> = (props) => {
  const { rowTrack, columnTrack } = props

  const rowGridAreas = rowTrack.map(track => track.join(' / '))
  const columnGridAreas = columnTrack.map(track => track.join(' / '))

  return (
    <>
      {rowGridAreas.map(
        gridArea => (
          <div
            key={gridArea}
            className={styles.track}
            style={{ gridArea }}
          />
        ),
      )}

      {columnGridAreas.map(
        gridArea => (
          <div
            key={gridArea}
            className={styles.track}
            style={{ gridArea }}
          />
        ),
      )}
    </>
  )
}

export default Index
