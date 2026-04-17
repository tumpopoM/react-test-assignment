import { Button, Table } from "antd";
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
import PersonForm from "../components/PersonForm";

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
      title: t("name"),
      dataIndex: "name",
      render: (_: any, record: any) => `${record.firstname} ${record.lastname}`,
      sorter: (a: any, b: any) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("mobile"),
      dataIndex: "phone",
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("manage"),
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
            {t("edit")}
          </a>{" "}
          |{" "}
          <a
            onClick={() => {
              dispatch(deletePerson(record.id));
            }}
          >
            {t("delete")}
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
      <PersonForm
        form={form}
        onFinish={onFinish}
        editingId={editingId}
        onFinishFailed={onFinishFailed}
      />

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
