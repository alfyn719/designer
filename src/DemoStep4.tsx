import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const { Option } = Select

export interface User {
  id: number
  name: string
  gender: string
  age: number
  isVip?: boolean
}

export interface UserManagementProps {
  users: User[]
  onAddUser: (values: Omit<User, 'id'>) => void
  onUpdateUser: (user: User, values: Partial<Omit<User, 'id'>>) => void
  onDeleteUser: (user: User) => void
  onFilter: (values: any) => void
  onMounted?: () => void
  onUnmounted?: () => void
}

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onFilter,
  onMounted,
  onUnmounted,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [addForm] = Form.useForm()
  const [filterForm] = Form.useForm()
  const [updateForm] = Form.useForm()

  useEffect(() => {
    if (onMounted) {
      onMounted()
    }
    return () => {
      if (onUnmounted) {
        onUnmounted()
      }
    }
  }, [onMounted, onUnmounted])

  const handleAddUser = (values: any) => {
    onAddUser(values)
    addForm.resetFields()
    message.success('User added successfully')
  }

  const handleUpdateUser = (values: any) => {
    if (!selectedUser)
      return
    onUpdateUser(selectedUser, values)
    setSelectedUser(null)
    setIsModalVisible(false)
    updateForm.resetFields()
    message.success('User updated successfully')
  }

  const handleDeleteUser = (user: User) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this user?',
      onOk: () => {
        onDeleteUser(user)
        message.success('User deleted successfully')
      },
    })
  }

  const openUpdateModal = (user: User) => {
    setSelectedUser(user)
    updateForm.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleFilter = (values: any) => {
    onFilter(values)
    message.info('Filter applied (simulation)')
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender', width: 100 },
    { title: 'Age', dataIndex: 'age', key: 'age', width: 80 },
    {
      title: 'VIP',
      dataIndex: 'isVip',
      key: 'isVip',
      width: 80,
      render: (value: boolean) => (value ? 'Yes' : 'No'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => openUpdateModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Filter Form */}
      <div className="mb-4 bg-white p-4 shadow rounded">
        <Form form={filterForm} layout="inline" onFinish={handleFilter}>
          <Form.Item name="name" label="Name">
            <Input placeholder="Filter by name" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select gender" allowClear style={{ width: 120 }}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="ageMin" label="Age Min">
            <Input type="number" placeholder="Min age" />
          </Form.Item>
          <Form.Item name="ageMax" label="Age Max">
            <Input type="number" placeholder="Max age" />
          </Form.Item>
          <Form.Item name="isVip" label="VIP">
            <Select placeholder="VIP" allowClear style={{ width: 120 }}>
              <Option value>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* User List Table */}
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        className="mb-4"
        pagination={{ pageSize: 5 }}
      />

      {/* Add User Form */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        <Form form={addForm} layout="vertical" onFinish={handleAddUser}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select the gender' }]}
          >
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please input the age' }]}
          >
            <Input type="number" placeholder="Enter age" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Update User Modal */}
      <Modal
        title="Update User"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedUser(null)
          updateForm.resetFields()
        }}
        footer={null}
      >
        <Form form={updateForm} layout="vertical" onFinish={handleUpdateUser}>
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input type="number" placeholder="Enter age" />
          </Form.Item>
          <Form.Item name="isVip" label="VIP">
            <Select placeholder="Select VIP status" allowClear>
              <Option value>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement
