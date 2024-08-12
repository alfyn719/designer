import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'
import Area from '../Area'
import Track from '../Track'
import Unit from '../Unit'

const Index = () => {
  const colors = useGridContext(state => state.colors)
  const cssVariable = useGridContext(state => state.cssVariable())

  const units = useGridContext(state => state.units())
  const areas = useGridContext(state => state.sortedArea())
  const [rowTrack, columnTrack] = useGridContext(state => state.trackGridArea())

  return (
    <div className={styles.gridLayout} style={cssVariable}>
      <Unit units={units} />
      <Area className={styles.area} areas={areas} colors={colors} />
      <Track className={styles.track} rowTrack={rowTrack} columnTrack={columnTrack} />
    </div>
  )
}

export default Index
