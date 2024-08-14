import styles from './index.module.less'
import useGridContext from '../../hooks/use-grid-context.ts'

const Selecto = () => {
  const selecto = useGridContext(state => state._selectRect)

  return (
    <div
      className={styles.selecto}
      style={{
        left: selecto.left,
        top: selecto.top,
        width: selecto.width,
        height: selecto.height,
      }}
    >
    </div>
  )
}

export default Selecto
