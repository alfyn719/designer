import type { Structure } from '../configs/common.type'

import { Form } from 'antd'
import { useEffect, useState } from 'react'

import CommonFormItem from './CommonFormItem'
import LocalFormItem from './LocalFormItem'

const DataSourceForm = () => {
  const [form] = Form.useForm()

  const type = Form.useWatch<undefined | 'api' | 'local'>('type', form)

  useEffect(() => {
    form.setFieldsValue({
      structure: {
        name: 'string',
      },
    })
  }, [])

  return (
    <Form
      name="dataSource"
      form={form}
      layout="vertical"
    >
      <CommonFormItem />

      {type === 'local' && <LocalFormItem />}
    </Form>
  )
}

export default DataSourceForm
