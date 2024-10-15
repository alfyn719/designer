import { Form } from 'antd'

import CommonFormItem from './CommonFormItem'

const DataSourceForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical">
      <CommonFormItem form={form} />
    </Form>
  )
}

export default DataSourceForm
