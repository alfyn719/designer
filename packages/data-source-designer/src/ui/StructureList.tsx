import type { FC } from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input } from 'antd'
import { Card, type FormInstance } from 'antd'
import { useState } from 'react'

interface StructureFormListProps {
  value?: any
  onChange?: (value: any) => void
}

const StructureList: FC<StructureFormListProps> = (props) => {
  const { value, onChange } = props

  const [form] = Form.useForm()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    console.log(form.getFieldsValue())

    onChange(value)
    setOpen(false)
  }

  return (
    <>
      <div>结构</div>
      <div onClick={() => setOpen(true)}>修改</div>

      <Drawer
        open={open}
        onClose={handleClose}
        title="数据结构配置"
      >
        <Form form={form}>
          <Form.List name="structure">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Card
                    key={key}
                  >
                    <Form.Item label="属性名" name={[name, 'name']}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="属性结构" name={[name, 'structure']}>
                      <Input.TextArea />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Card>
                ))}

                <Button type="primary" onClick={() => add()}>
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
