import type { Structure } from '../configs/common.type'
import type { FC } from 'react'
import { Button } from 'antd'

interface ILocalDataList {
  structure: Structure
}

const LocalDataList: FC<ILocalDataList> = (props) => {
  const { structure } = props

  return (
    <>
      <Button>添加</Button>
      <Button>删除</Button>
    </>
  )
}

export default LocalDataList
