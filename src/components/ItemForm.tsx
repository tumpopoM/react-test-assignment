import { Form, Input, Button, InputNumber } from "antd";

type FormValues = {
  name: string;
  age: number;
};

type Props = {
  form: any;
  onFinish: (values: FormValues) => void;
  editingItemId: string | null;
};

function ItemForm({ form, onFinish, editingItemId }: Props) {
  return (
    <>
      <h2>Add Item</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {editingItemId ? "Update" : "Submit"}
        </Button>
      </Form>
    </>
  );
}

export default ItemForm;
