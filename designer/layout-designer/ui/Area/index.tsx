import type { NamedAreaArr } from '../../model/create-grid-store/index.type.ts'
import type { FC } from 'react'

import cls from 'classnames'

import styles from './index.module.less'

interface IAreaProps {
  areas: NamedAreaArr
  colors: string[]
}

// TODO 3D 模式预览 ->

const Area: FC<IAreaProps> = (props) => {
  const { areas, colors } = props

  return (
    <>
      {areas.map(([areaName, gridArea], index) => (
        <div
          key={areaName}
          style={{
            gridArea: gridArea.join(' / '),
            background: colors[index],
            border: '1px dashed #d9d9d9',
          }}
        >
          {areaName}
        </div>
      ))}
    </>
  )
}

export default Area
