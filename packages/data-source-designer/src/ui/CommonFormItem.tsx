import type { FormInstance } from 'antd'
import type { FC } from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select } from 'antd'

import StructureFormList from './StructureList'

interface CommonFormProps {
  form: FormInstance
}

const CommonFormItem: FC<CommonFormProps> = (props) => {
  const { form } = props

  return (
    <>
      <Form.Item label="名称" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="结构" name="structure">
        <StructureFormList />
      </Form.Item>

      <Form.Item label="类型" name="type">
        <Select>
          <Select.Option value="api">接口获取</Select.Option>
          <Select.Option value="local">静态数据</Select.Option>
        </Select>
      </Form.Item>
    </>
  )
}

export default CommonFormItem
