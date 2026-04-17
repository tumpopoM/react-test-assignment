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
import {
  setPersons,
  addPerson,
  deletePerson,
  deleteMultiple,
  updatePerson,
} from "../store/personSlice";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

function FormPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.person.list);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

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
      id: editingId || uuidv4(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
      phone: `${values.phoneCode}${values.phoneNumber}`,
      nationality: values.nationality,
      passport: values.passport,
      salary: values.salary,
      birthday: values.birthday.format("YYYY-MM-DD"),
    };

    if (editingId) {
      dispatch(updatePerson(newPerson));
      message.success("Update success");
    } else {
      dispatch(addPerson(newPerson));
      message.success("Save success");
    }

    setEditingId(null);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("FAILED:", errorInfo);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys as string[]);
    },
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
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setEditingId(record.id);

              form.setFieldsValue({
                title: record.title,
                firstname: record.firstname,
                lastname: record.lastname,
                gender: record.gender,
                nationality: record.nationality,
                phoneCode: record.phone?.slice(0, 3),
                phoneNumber: record.phone?.slice(3),
                passport: record.passport,
                salary: record.salary,
                birthday: record.birthday ? dayjs(record.birthday) : null,
              });
            }}
          >
            Edit
          </a>{" "}
          |{" "}
          <a
            onClick={() => {
              dispatch(deletePerson(record.id));
            }}
          >
            Delete
          </a>
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
        <input
          type="checkbox"
          checked={
            selectedRowKeys.length === persons.length && persons.length > 0
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(persons.map((p) => p.id));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />{" "}
        {t("selectAll")}
        <Button
          danger
          style={{ marginLeft: 10 }}
          onClick={() => {
            dispatch(deleteMultiple(selectedRowKeys));
            setSelectedRowKeys([]);
          }}
        >
          {t("delete")}
        </Button>
      </div>

      {/* 🔹 Table placeholder */}
      <div style={{ marginTop: 20 }}>
        <Table
          dataSource={persons}
          columns={columns}
          rowKey="id"
          rowSelection={rowSelection}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default FormPage;
