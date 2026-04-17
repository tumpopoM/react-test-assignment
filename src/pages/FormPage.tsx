import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPersons, deletePerson, deleteMultiple } from "../store/personSlice";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import PersonForm from "../components/PersonForm";
import PersonTable from "../components/PersonTable";
import { usePersonForm } from "../hooks/usePersonForm";

function FormPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const persons = useSelector((state: RootState) => state.person.list);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { onFinish, onFinishFailed, normalizePhone } = usePersonForm(
    form,
    editingId,
    setEditingId,
  );

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

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys as string[]);
    },
  };

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
        <PersonTable
          data={persons}
          rowSelection={rowSelection}
          onEdit={(record) => {
            setEditingId(record.id);

            form.setFieldsValue({
              title: record.title,
              firstname: record.firstname,
              lastname: record.lastname,
              gender: record.gender,
              nationality: record.nationality,
              citizenId: record.citizenId
                ? [
                    record.citizenId.slice(0, 1),
                    record.citizenId.slice(1, 5),
                    record.citizenId.slice(5, 10),
                    record.citizenId.slice(10, 12),
                    record.citizenId.slice(12, 13),
                  ]
                : [],
              phoneCode: record.phoneCode || "+66",
              phoneNumber:
                record.phoneCode === "+66"
                  ? normalizePhone(record.phone)
                  : record.phone,
              passport: record.passport,
              salary: record.salary,
              birthday: record.birthday ? dayjs(record.birthday) : null,
            });
          }}
          onDelete={(id) => dispatch(deletePerson(id))}
        />
      </div>
    </div>
  );
}

export default FormPage;
