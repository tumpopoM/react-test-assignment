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
  type InputRef,
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import "./PersonForm.css";
import { useRef } from "react";
import {
  requiredRule,
  numberOnlyRule,
  phoneRule,
  passportRule,
  citizenIdRule,
  birthdayRule,
} from "../utils/validation";

interface Props {
  form: any;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  editingId: string | null;
}

function PersonForm({ form, onFinish, editingId, onFinishFailed }: Props) {
  const { t } = useTranslation();
  const citizenRefs = useRef<(InputRef | null)[]>([]);

  const citizenMaxLengths = [1, 4, 5, 2, 1];

  const handleCitizenChange = (value: string, index: number) => {
    if (value.length === citizenMaxLengths[index]) {
      citizenRefs.current[index + 1]?.focus();
    }
  };

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
      className="person-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label={t("title")}
            name="title"
            rules={[requiredRule(t)]}
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
              requiredRule(t),
              { pattern: /^[A-Za-zก-๙\s]+$/, message: t("invalidFirstName") },
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
              requiredRule(t),
              { pattern: /^[A-Za-zก-๙\s]+$/, message: t("invalidLastName") },
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
            rules={[requiredRule(t), birthdayRule(t)]}
            style={{ marginBottom: 10 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current >= dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label={t("nationality")}
            name="nationality"
            rules={[requiredRule(t)]}
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
          <Form.Item
            label={t("citizenId")}
            rules={[citizenIdRule(t)]}
            style={{ marginBottom: 10 }}
          >
            <Row gutter={8}>
              <Col span={2}>
                <Form.Item name={["citizenId", 0]} style={{ marginBottom: 0 }}>
                  <Input
                    maxLength={1}
                    ref={(el) => {
                      citizenRefs.current[0] = el;
                    }}
                    onChange={(e) => handleCitizenChange(e.target.value, 0)}
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
                    ref={(el) => {
                      citizenRefs.current[1] = el;
                    }}
                    onChange={(e) => handleCitizenChange(e.target.value, 1)}
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
                    ref={(el) => {
                      citizenRefs.current[2] = el;
                    }}
                    onChange={(e) => handleCitizenChange(e.target.value, 2)}
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
                    ref={(el) => {
                      citizenRefs.current[3] = el;
                    }}
                    onChange={(e) => handleCitizenChange(e.target.value, 3)}
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
                    ref={(el) => {
                      citizenRefs.current[4] = el;
                    }}
                    onChange={(e) => handleCitizenChange(e.target.value, 4)}
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
              rules={[requiredRule(t)]}
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
              rules={[requiredRule(t), phoneRule(t)]}
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
            rules={[passportRule(t)]}
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
            rules={[requiredRule(t)]}
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
