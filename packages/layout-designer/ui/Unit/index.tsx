import type { GridArea } from '../../model/create-grid-store/index.type.ts'
import type { FC } from 'react'

import styles from './index.module.less'

interface IUnitProps {
  units: GridArea[]
}

const Unit: FC<IUnitProps> = (props) => {
  const { units } = props

  const unitAreas = units.map(unit => unit.join(' / '))

  return (
    <>
      {unitAreas.map(unitArea => (
        <div key={unitArea} style={{ gridArea: unitArea }} className={styles.unit} />
      ))}
    </>
  )
}

export default Unit
