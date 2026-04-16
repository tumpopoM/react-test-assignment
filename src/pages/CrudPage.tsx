import { Form } from "antd";
import ItemForm from "../components/ItemForm";
import ItemTable from "../components/ItemTable";
import { useState } from "react";
import { addItem, deleteItem, updateItem, type Item } from "../store/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";

function CrudPage() {
  type FormValues = {
    name: string;
    age: number;
  };

  const [editingItemId, setEditingItemId] = useState<any>(null);
  const [form] = Form.useForm();
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch();

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

export default CrudPage;
function uuidv4(): string {
  throw new Error("Function not implemented.");
}
