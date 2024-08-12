import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'
import Tab from '../Tab'
import Workspace from '../Workspace'

const GridLayout = () => {
  const cssVariable = useGridContext(state => state.cssVariable())
  const columnCount = useGridContext(state => state.gridTemplateColumns.length)
  const rowCount = useGridContext(state => state.gridTemplateRows.length)

  return (
    <div className={styles.gridWorkspace} style={cssVariable}>
      <Tab className={styles.rowTab} type="Row" count={rowCount} />
      <Tab className={styles.columnTab} type="Column" count={columnCount} />
      <Workspace className={styles.workspace} />
    </div>
  )
}

export default GridLayout
