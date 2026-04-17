import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Radio,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  form: any;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  editingId: string | null;
}

function PersonForm({ form, onFinish, editingId, onFinishFailed }: Props) {
  const { t } = useTranslation();
  const countryOptions = [
    {
      value: "+66",
      label: (
        <span>
          <img
            src="https://flagcdn.com/w20/th.png"
            style={{ width: 20, marginRight: 8 }}
          />
          +66
        </span>
      ),
    },
    {
      value: "+1",
      label: (
        <span>
          <img
            src="https://flagcdn.com/w20/us.png"
            style={{ width: 20, marginRight: 8 }}
          />
          +1
        </span>
      ),
    },
    {
      value: "+81",
      label: (
        <span>
          <img
            src="https://flagcdn.com/w20/jp.png"
            style={{ width: 20, marginRight: 8 }}
          />
          +81
        </span>
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{
        background: "#fff",
        border: "1px solid #e2e2e2",
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
            rules={[
              { required: true },
              { pattern: /^[A-Za-zก-๙\s]+$/, message: "Invalid First Name" },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            label={t("lastName")}
            name="lastname"
            rules={[
              { required: true },
              { pattern: /^[A-Za-zก-๙\s]+$/, message: "Invalid Last Name" },
            ]}
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
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label={t("nationality")}
            name="nationality"
            rules={[{ required: true }]}
            style={{ marginBottom: 10 }}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "Thai", label: "Thai" },
                { value: "American", label: "American" },
                { value: "Japanese", label: "Japanese" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={24}>
          <Form.Item label={t("citizenId")} style={{ marginBottom: 10 }}>
            <Row gutter={8}>
              <Col span={2}>
                <Form.Item name={["citizenId", 0]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 8px",
                }}
              >
                -
              </span>

              <Col span={4}>
                <Form.Item name={["citizenId", 1]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={4}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 8px",
                }}
              >
                -
              </span>

              <Col span={4}>
                <Form.Item name={["citizenId", 2]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={5}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 8px",
                }}
              >
                -
              </span>

              <Col span={3}>
                <Form.Item name={["citizenId", 3]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={2}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 8px",
                }}
              >
                -
              </span>

              <Col span={2}>
                <Form.Item name={["citizenId", 4]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
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

      <Form.Item label={t("phone")} required style={{ marginBottom: 10 }}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              name="phoneCode"
              rules={[{ required: true, message: "Required" }]}
              style={{ marginBottom: 0 }}
            >
              <Select options={countryOptions} />
            </Form.Item>
          </Col>

          <span
            style={{ display: "flex", alignItems: "center", margin: "0 8px" }}
          >
            -
          </span>

          <Col span={10}>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Required" },
                { pattern: /^[0-9]{8,10}$/, message: "Invalid phone" },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item
            label={t("passport")}
            name="passport"
            style={{ marginBottom: 10 }}
            rules={[
              { pattern: /^[0-9]+$/, message: "Numbers only" },
              { min: 8, message: "At least 8 digits" },
            ]}
          >
            <Input
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={10}>
          <Form.Item
            label={t("salary")}
            name="salary"
            style={{ marginBottom: 10 }}
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              precision={0}
              formatter={(value?: string | number) =>
                value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
              }
              parser={(value?: string) =>
                value ? Number(value.replace(/,/g, "")) : 0
              }
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* 🔹 Buttons */}
      <Row justify="end" style={{ marginTop: 10, gap: 10 }}>
        <Button onClick={() => form.resetFields()}>{t("reset")}</Button>
        <Button type="primary" htmlType="submit">
          {editingId ? t("update") : t("submit")}
        </Button>
      </Row>
    </Form>
  );
}

export default PersonForm;
