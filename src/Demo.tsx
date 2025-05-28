import { Button, Form, Input, InputNumber, message, Modal, Select, Switch, Table } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface User {
  id: number
  name: string
  gender: string
  age: number
  isVip?: boolean
  deleted?: boolean
}

const UserManagement: React.FC = () => {
  // State for user list and filtered results
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  // Forms and Modal State
  const [addForm] = Form.useForm()
  const [queryForm] = Form.useForm()
  const [updateForm] = Form.useForm()
  const [isDetailModalVisible, setDetailModalVisible] = useState<boolean>(false)
  const [isUpdateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Handle Add User (POST /user/add)
  const handleAddUser = (values: any) => {
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser: User = { id: newId, ...values }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    setFilteredUsers(updatedUsers)
    message.success('User added successfully')
    addForm.resetFields()
  }

  // Handle Query Users (POST /user/read)
  const handleQueryUsers = (values: any) => {
    let result = [...users]
    if (values.name)
      result = result.filter(user => user.name.includes(values.name))
    if (values.ageMin != null)
      result = result.filter(user => user.age >= values.ageMin)
    if (values.ageMax != null)
      result = result.filter(user => user.age <= values.ageMax)
    if (values.gender)
      result = result.filter(user => user.gender === values.gender)
    if (values.isVip != null)
      result = result.filter(user => user.isVip === values.isVip)
    setFilteredUsers(result)
  }

  // Show User Detail (GET /user/{id})
  const handleGetUser = (user: User) => {
    setSelectedUser(user)
    setDetailModalVisible(true)
  }

  // Open Update Modal (PUT /user/{id})
  const handleOpenUpdate = (user: User) => {
    setSelectedUser(user)
    updateForm.setFieldsValue(user)
    setUpdateModalVisible(true)
  }

  // Handle Update User
  const handleUpdateUser = (values: any) => {
    if (!selectedUser)
      return
    const updatedUser = { ...selectedUser, ...values }
    const updatedUsers = users.map(user => (user.id === selectedUser.id ? updatedUser : user))
    setUsers(updatedUsers)
    setFilteredUsers(updatedUsers)
    message.success('User updated successfully')
    setUpdateModalVisible(false)
    setSelectedUser(null)
  }

  // Handle Soft Delete User (DELETE /user/{id})
  const handleSoftDeleteUser = (user: User) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to soft delete this user?',
      onOk: () => {
        const updatedUser = { ...user, deleted: true }
        const updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u))
        setUsers(updatedUsers)
        setFilteredUsers(updatedUsers)
        message.success('User soft deleted successfully')
      },
    })
  }

  // Define Table Columns
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'VIP',
      dataIndex: 'isVip',
      key: 'isVip',
      render: (_: any, record: User) => (record.isVip ? 'Yes' : 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'deleted',
      key: 'deleted',
      render: (deleted: boolean) => (deleted ? 'Deleted' : 'Active'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <div className="space-x-2">
          <Button size="small" onClick={() => handleGetUser(record)}>Detail</Button>
          <Button size="small" onClick={() => handleOpenUpdate(record)}>Update</Button>
          <Button size="small" danger onClick={() => handleSoftDeleteUser(record)}>Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Add User Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        <Form form={addForm} layout="inline" onFinish={handleAddUser}>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input name' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="gender" rules={[{ required: true, message: 'Please input gender' }]}>
            <Input placeholder="Gender" />
          </Form.Item>
          <Form.Item name="age" rules={[{ required: true, message: 'Please input age' }]}>
            <InputNumber placeholder="Age" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </section>

      {/* Query Users Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Query Users</h2>
        <Form form={queryForm} layout="inline" onFinish={handleQueryUsers}>
          <Form.Item name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="ageMin">
            <InputNumber placeholder="Age Min" />
          </Form.Item>
          <Form.Item name="ageMax">
            <InputNumber placeholder="Age Max" />
          </Form.Item>
          <Form.Item name="gender">
            <Select placeholder="Gender" style={{ width: 120 }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isVip" valuePropName="checked">
            <Switch checkedChildren="VIP" unCheckedChildren="Non-VIP" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Search</Button>
          </Form.Item>
        </Form>
      </section>

      {/* Users Table */}
      <section>
        <Table
          dataSource={filteredUsers.length ? filteredUsers : users}
          columns={columns}
          rowKey="id"
        />
      </section>

      {/* Get User Detail Modal */}
      <Modal
        title="User Detail"
        open={isDetailModalVisible}
        footer={null}
        onCancel={() => {
          setDetailModalVisible(false)
          setSelectedUser(null)
        }}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>ID:</strong>
              {' '}
              {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong>
              {' '}
              {selectedUser.name}
            </p>
            <p>
              <strong>Gender:</strong>
              {' '}
              {selectedUser.gender}
            </p>
            <p>
              <strong>Age:</strong>
              {' '}
              {selectedUser.age}
            </p>
            <p>
              <strong>VIP:</strong>
              {' '}
              {selectedUser.isVip ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Status:</strong>
              {' '}
              {selectedUser.deleted ? 'Deleted' : 'Active'}
            </p>
          </div>
        )}
      </Modal>

      {/* Update User Modal */}
      <Modal
        title="Update User"
        open={isUpdateModalVisible}
        onCancel={() => {
          setUpdateModalVisible(false)
          setSelectedUser(null)
        }}
        footer={null}
      >
        <Form form={updateForm} layout="vertical" onFinish={handleUpdateUser}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <InputNumber />
          </Form.Item>
          <Form.Item name="isVip" label="VIP" valuePropName="checked">
            <Switch checkedChildren="VIP" unCheckedChildren="Non-VIP" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement
