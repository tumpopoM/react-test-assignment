import { Form, Input, Button, Row, Col, Select, DatePicker, Radio } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  form: any;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  editingId: string | null;
}

function PersonForm({ form, onFinish, editingId, onFinishFailed }: Props) {
  const { t } = useTranslation();

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        border: "1px solid #333",
        borderRadius: 10,
        padding: 20,
        maxWidth: 900,
        gap: 0,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label={t("title")}
            name="title"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "mr", label: "Mr." },
                { value: "ms", label: "Ms." },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            label={t("firstName")}
            name="firstname"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            label={t("lastName")}
            name="lastname"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={t("birthday")}
            name="birthday"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            label={t("nationality")}
            name="nationality"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Select
              style={{ width: "100%" }}
              options={[{ value: "Thai", label: "Thai" }]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            label={t("gender")}
            name="gender"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Radio.Group>
              <Radio value="Male">{t("male")}</Radio>
              <Radio value="Female">{t("female")}</Radio>
              <Radio value="Unsex">{t("unsex")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={t("phone")}
            name="phoneCode"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Select
              style={{ width: "100%" }}
              options={[{ value: "+66", label: "+66" }]}
            />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item
            label=" "
            name="phoneNumber"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            label={t("passport")}
            name="passport"
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label={t("salary")}
            name="salary"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* 🔹 Buttons */}
      <Row justify="end" style={{ marginTop: 20, gap: 10 }}>
        <Button onClick={() => form.resetFields()}>{t("reset")}</Button>
        <Button type="primary" htmlType="submit">
          {editingId ? t("update") : t("submit")}
        </Button>
      </Row>
    </Form>
  );
}

export default PersonForm;
