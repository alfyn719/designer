import {
  Badge,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Switch,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'

const { Option } = Select

interface User {
  id: number
  name: string
  gender: string
  age: number
  isVip: boolean
  isDeleted?: boolean
}

interface QueryParams {
  name?: string
  ageMin?: number
  ageMax?: number
  gender?: string
  isVip?: boolean
}

interface UserManagementProps {
  // 用户列表，由外部传入
  users: User[]
  // 根据查询条件获取用户列表的回调
  onQueryUsers: (query: QueryParams) => void
  // 添加用户的回调，参数为新增用户信息
  onAddUser: (user: { name: string, gender: string, age: number, isVip?: boolean }) => void
  // 更新用户的回调，参数为用户 id 及更新信息
  onUpdateUser: (
    id: number,
    user: Partial<{ name: string, gender: string, age: number, isVip: boolean }>
  ) => void
  // 软删除用户的回调，参数为用户 id
  onSoftDeleteUser: (id: number) => void
  // 获取用户详情的回调，参数为用户 id，返回用户详情（可同步或异步）
  onGetUser: (id: number) => User | Promise<User>
  // 生命周期钩子：组件挂载时执行
  onMounted?: () => void
  // 生命周期钩子：组件卸载前执行
  onUnmounted?: () => void
}

const UserManagementPage: React.FC<UserManagementProps> & { propsSchema?: any } = (props) => {
  // 生命周期钩子
  useEffect(() => {
    props.onMounted && props.onMounted()
    return () => {
      props.onUnmounted && props.onUnmounted()
    }
  }, [])

  // 表单实例
  const [queryForm] = Form.useForm()
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()

  // 模态框状态
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // 查询用户处理函数
  const handleQuery = (values: QueryParams) => {
    props.onQueryUsers(values)
  }

  // 添加用户处理函数
  const handleAddUser = (values: any) => {
    props.onAddUser(values)
    message.success('用户添加成功')
    setAddModalVisible(false)
    addForm.resetFields()
  }

  // 编辑用户处理函数
  const handleEditUser = (values: any) => {
    if (currentUser) {
      props.onUpdateUser(currentUser.id, values)
      message.success('用户更新成功')
      setEditModalVisible(false)
      setCurrentUser(null)
    }
  }

  // 软删除用户处理函数
  const handleDeleteUser = (user: User) => {
    Modal.confirm({
      title: '确认删除',
      content: '是否确认软删除该用户？',
      onOk: () => {
        props.onSoftDeleteUser(user.id)
        message.success('用户已软删除')
      },
    })
  }

  // 查看详情处理函数
  const handleViewDetails = async (user: User) => {
    const result = props.onGetUser(user.id)
    if (result instanceof Promise) {
      const userDetails = await result
      setCurrentUser(userDetails)
    }
    else {
      setCurrentUser(result)
    }
    setDetailsModalVisible(true)
  }

  // 表格列配置
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'gender', key: 'gender', width: 100 },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
    {
      title: 'VIP',
      dataIndex: 'isVip',
      key: 'isVip',
      width: 80,
      render: (vip: boolean) => (vip ? '是' : '否'),
    },
    {
      title: '状态',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: 100,
      render: (deleted: boolean) =>
        deleted ? <Badge status="error" text="已删除" /> : <Badge status="success" text="正常" />,
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
      render: (_: any, record: User) => (
        <div className="flex space-x-2">
          <Button size="small" onClick={() => handleViewDetails(record)}>
            查看
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCurrentUser(record)
              editForm.setFieldsValue({
                name: record.name,
                gender: record.gender,
                age: record.age,
                isVip: record.isVip,
              })
              setEditModalVisible(true)
            }}
          >
            编辑
          </Button>
          <Button size="small" danger onClick={() => handleDeleteUser(record)}>
            删除
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4">
      {/* 查询区域 */}
      <Card className="mb-4" title="查询用户">
        <Form
          form={queryForm}
          layout="inline"
          onFinish={handleQuery}
          className="flex flex-wrap gap-4"
        >
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="ageMin" label="最小年龄">
            <InputNumber placeholder="最小年龄" />
          </Form.Item>
          <Form.Item name="ageMax" label="最大年龄">
            <InputNumber placeholder="最大年龄" />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select placeholder="请选择" style={{ width: 120 }}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isVip" label="VIP">
            <Select placeholder="请选择" style={{ width: 120 }}>
              <Option value>是</Option>
              <Option value={false}>否</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                queryForm.resetFields()
                props.onQueryUsers({})
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 添加用户按钮 */}
      <div className="mb-4">
        <Button type="primary" onClick={() => setAddModalVisible(true)}>
          新增用户
        </Button>
      </div>

      {/* 用户列表 */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.users}
        pagination={{ pageSize: 5 }}
      />

      {/* 新增用户 Modal */}
      <Modal
        title="新增用户"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }]}>
            <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isVip" label="VIP">
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={false} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-2">
              提交
            </Button>
            <Button onClick={() => setAddModalVisible(false)}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑用户 Modal */}
      <Modal
        title="编辑用户"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false)
          setCurrentUser(null)
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditUser}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }]}>
            <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isVip" label="VIP">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-2">
              更新
            </Button>
            <Button
              onClick={() => {
                setEditModalVisible(false)
                setCurrentUser(null)
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 用户详情 Modal */}
      <Modal
        title="用户详情"
        open={detailsModalVisible}
        onCancel={() => {
          setDetailsModalVisible(false)
          setCurrentUser(null)
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailsModalVisible(false)
              setCurrentUser(null)
            }}
          >
            关闭
          </Button>,
        ]}
      >
        {currentUser && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{currentUser.id}</Descriptions.Item>
            <Descriptions.Item label="姓名">{currentUser.name}</Descriptions.Item>
            <Descriptions.Item label="性别">{currentUser.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{currentUser.age}</Descriptions.Item>
            <Descriptions.Item label="VIP">
              {currentUser.isVip ? '是' : '否'}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {currentUser.isDeleted
                ? (
                    <Badge status="error" text="已删除" />
                  )
                : (
                    <Badge status="success" text="正常" />
                  )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

// JSON Schema for props
const userManagementPropsSchema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          gender: { type: 'string' },
          age: { type: 'number' },
          isVip: { type: 'boolean' },
          isDeleted: { type: 'boolean' },
        },
        required: ['id', 'name', 'gender', 'age', 'isVip'],
      },
    },
    onQueryUsers: {
      type: 'function',
    },
    onAddUser: {
      type: 'function',
    },
    onUpdateUser: {
      type: 'function',
    },
    onSoftDeleteUser: {
      type: 'function',
    },
    onGetUser: {
      type: 'function',
    },
    onMounted: {
      type: 'function',
    },
    onUnmounted: {
      type: 'function',
    },
  },
  required: [
    'users',
    'onQueryUsers',
    'onAddUser',
    'onUpdateUser',
    'onSoftDeleteUser',
    'onGetUser',
  ],
}

UserManagementPage.propsSchema = userManagementPropsSchema

export default UserManagementPage
