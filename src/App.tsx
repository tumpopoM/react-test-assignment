import { Form, Input, Button, InputNumber, Table, Space } from 'antd'
import { useState } from 'react'
import {   useSelector,useDispatch } from 'react-redux'
import { addItem, deleteItem, updateItem } from './store/itemSlice'
import { v4 as uuidv4 } from 'uuid'
import type { RootState} from './store/store'


type FormValues = {
  name: string
  age: number
}



function App() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const onFinish = (values: FormValues) => {
   if (editingItemId) {
       dispatch(
        addItem(
          {
            id: uuidv4(),
            name: values.name,
            age: values.age,
          }
        )
      )
      setEditingItemId(null)
    } else {
      dispatch(
        addItem({
          id: uuidv4(),
          name: values.name,
          age: values.age,
        })
      )
    }
    form.resetFields()
  }

  const items = useSelector((state: RootState) => state.items.items)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
            <Button type="primary" onClick={() => {
              setEditingItemId(record.id)
              form.setFieldsValue({
                name: record.name,
                age: record.age,
              })
              setEditingItemId(record.id)
            }}>
            Edit
          </Button>

          <Button type="primary" danger onClick={() => dispatch(deleteItem(record.id))}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 20}}>
      <h2>Add Item</h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form>

      <h2 style={{ marginTop: 40 }}>Items List</h2>
      <Table dataSource={items} columns={columns} rowKey="id" />
    </div>
  )
}

export default App