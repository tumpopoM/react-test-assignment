import { Form, Input, Button, InputNumber, Table, Space } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, updateItem, setItems } from "./store/itemSlice";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "./store/store";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";

type FormValues = {
  name: string;
  age: number;
};

function App() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [editingItemId, setEditingItemId] = useState<any>(null);
  const items = useSelector((state: RootState) => state.items.items);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("items");

    if (data) {
      dispatch(setItems(JSON.parse(data)));
    }

    setIsLoaded(true); // ✅ บอกว่าโหลดเสร็จแล้ว
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const onFinish = (values: FormValues) => {
    if (editingItemId) {
      dispatch(
        updateItem({
          id: editingItemId,
          name: values.name,
          age: values.age,
        }),
      );
      setEditingItemId(null);
    } else {
      dispatch(
        addItem({
          id: uuidv4(),
          name: values.name,
          age: values.age,
        }),
      );
    }
    form.resetFields();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setEditingItemId(record.id);
              form.setFieldsValue({
                name: record.name,
                age: record.age,
              });
              setEditingItemId(record.id);
            }}
          >
            Edit
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteItem(record.id))}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <ItemForm form={form} onFinish={onFinish} editingItemId={editingItemId} />

      <ItemTable
        items={items}
        onEdit={(record) => {
          setEditingItemId(record.id);
          form.setFieldsValue({
            name: record.name,
            age: record.age,
          });
        }}
        onDelete={(id) => dispatch(deleteItem(id))}
      />
    </div>
  );
}

export default App;
