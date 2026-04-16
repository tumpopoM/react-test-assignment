import { Form, Input, Button, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("addItem")}</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label={t("name")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="age" label={t("age")} rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {editingItemId ? t("update") : t("submit")}
        </Button>
      </Form>
    </>
  );
}

export default ItemForm;
