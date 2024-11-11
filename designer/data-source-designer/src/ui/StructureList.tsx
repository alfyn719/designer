import type { FC } from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Form, Input, Tooltip } from 'antd'
import { isArray, isFunction } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'

import { pipelineToolkit } from '../../../../packages/tools'

const { pipeline, log } = pipelineToolkit

interface StructureFormListProps {
  value?: any
  onChange?: (value: any) => void
}

// [{name: 'student', structure: 'string'}] => { student: string }
const transformer = (value: any) => {
  if (!value || !isArray(value)) {
    return {}
  }

  return value.reduce((acc, item) => {
    if (item.name && item.structure) {
      acc[item.name] = item.structure
    }
    return acc
  }, {})
}

// { student: string } => [{name: 'student', structure: 'string'}]
const reverseTransformer = (value: any) => {
  if (!value || typeof value !== 'object') {
    return []
  }

  return Object
    .entries(value)
    .map(([name, structure]) => ({ name, structure }))
}

const StructureList: FC<StructureFormListProps> = (props) => {
  const { value, onChange } = props
  const reverseValue = reverseTransformer(value)

  const [form] = Form.useForm()

  const [open, setOpen] = useState(false)

  const drawerOpenCount = useRef<number>(0)

  useEffect(() => {
    if (!open)
      return

    drawerOpenCount.current += 1

    // make sure the form is connected to the dom
    if (drawerOpenCount.current === 1) {
      form.setFieldsValue({ structure: reverseValue })
    }
  }, [open])

  useEffect(() => {
    if (drawerOpenCount.current <= 1)
      return

    form.setFieldsValue({ structure: reverseValue })
  }, [value])

  const handleClose = async () => {
    // TODO 校验需改成在点击完成时进行
    await form.validateFields()

    const value = form.getFieldValue('structure')

    if (isFunction(onChange)) {
      pipeline([onChange, transformer], value)
    }

    setOpen(false)
  }

  return (
    <>
      <Tooltip title={JSON.stringify(value)}>
        查看结构
      </Tooltip>

      <Button onClick={() => setOpen(true)}>修改</Button>

      <Drawer
        open={open}
        onClose={handleClose}
        title="数据结构配置"
      >
        <Form form={form} name="structure" layout="vertical">
          <Form.List name="structure">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Card
                    key={key}
                  >
                    <Form.Item
                      label="字段名称"
                      name={[name, 'name']}
                      rules={[
                        { required: true, message: '不能为空' },
                        { max: 99, message: '不能超过 99 个字符' },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="字段结构"
                      name={[name, 'structure']}
                      rules={[
                        { required: true, message: '不能为空' },
                        { max: 999, message: '不能超过 999 个字符' },
                      ]}
                    >
                      <Input.TextArea rows={3} showCount />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Card>
                ))}

                <Button type="primary" onClick={add}>
                  添加
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </>
  )
}

export default StructureList
