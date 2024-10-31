import { Form } from 'antd'

import LocalDataList from './LocalDataList'

const LocalFormItem = () => {
  const form = Form.useFormInstance()

  const structure = Form.useWatch('structure', form)

  return (
    <>
      <Form.Item label="数据" name="data">
        <LocalDataList structure={structure} />
      </Form.Item>
    </>
  )
}

export default LocalFormItem
