import { Form, Input, Button, InputNumber } from 'antd'
import { useDispatch } from 'react-redux'
import { addItem } from './store/itemSlice'
import { v4 as uuidv4 } from 'uuid'

type FormValues = {
  name: string
  age: number
}

function App() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onFinish = (values: FormValues) => {
    dispatch(
      addItem(
        {
          id: uuidv4(),
          name: values.name,
          age: values.age,
        }
      )
    )
    form.resetFields()
  }

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
    </div>
  )
}

export default App