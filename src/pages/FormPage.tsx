import {
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Radio,
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPersons, addPerson } from "../store/personSlice";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { v4 as uuidv4 } from "uuid";

function FormPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.person.list);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("persons");

    if (data) {
      dispatch(setPersons(JSON.parse(data)));
    }

    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("persons", JSON.stringify(persons));
    }
  }, [persons, isLoaded]);

  const onFinish = (values: any) => {
    const newPerson = {
      id: uuidv4(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
      phone: `${values.phoneCode}${values.phoneNumber}`,
      nationality: values.nationality,
    };

    dispatch(addPerson(newPerson));

    message.success("Save success");

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("FAILED:", errorInfo);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: any) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Mobile Phone",
      dataIndex: "phone",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
    },
    {
      title: "MANAGE",
      render: () => (
        <>
          <a>Edit</a> | <a>Delete</a>
        </>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      {/* 🔹 Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <Button onClick={() => navigate("/")}>{t("home")}</Button>
      </div>

      <h2>{t("formTable")}</h2>

      {/* 🔹 Form Box */}
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
              label={t("firstname")}
              name="firstname"
              rules={[{ required: true }]}
              style={{ marginBottom: 10 }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              label={t("lastname")}
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
                options={[{ value: "thai", label: "Thai" }]}
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
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="unsex">Unsex</Radio>
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
            {t("submit")}
          </Button>
        </Row>
      </Form>

      {/* 🔹 Action */}
      <div style={{ marginTop: 20 }}>
        <input type="checkbox" /> {t("selectAll")}
        <Button danger style={{ marginLeft: 10 }}>
          {t("delete")}
        </Button>
      </div>

      {/* 🔹 Table placeholder */}
      <div style={{ marginTop: 20 }}>
        <Table
          dataSource={persons}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default FormPage;
