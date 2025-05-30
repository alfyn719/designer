import { Form, Input, Select } from 'antd'

import StructureFormList from './StructureList'

const CommonFormItem = () => {
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
