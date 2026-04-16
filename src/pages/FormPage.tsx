import { Button, Row, Col, Input, Select, DatePicker, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPersons } from "../store/personSlice";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";

function FormPage() {
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
      <div
        style={{
          border: "1px solid #333",
          borderRadius: 10,
          padding: 20,
          maxWidth: 900,
        }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <label>* {t("title")}</label>
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "mr", label: "Mr." },
                { value: "ms", label: "Ms." },
              ]}
            />
          </Col>

          <Col span={9}>
            <label>* {t("firstname")}</label>
            <Input />
          </Col>

          <Col span={9}>
            <label>* {t("lastname")}</label>
            <Input />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={8}>
            <label>* {t("birthday")}</label>
            <DatePicker style={{ width: "100%" }} />
          </Col>

          <Col span={16}>
            <label>* {t("nationality")}</label>
            <Select
              style={{ width: "100%" }}
              options={[{ value: "thai", label: "Thai" }]}
            ></Select>
          </Col>
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <label>* {t("gender")}</label>
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="unsex">Unsex</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={8}>
            <label>* {t("phone")}</label>
            <Select style={{ width: "100%" }}>
              <Option value="+66">+66</Option>
            </Select>
          </Col>

          <Col span={16}>
            <label>&nbsp;</label>
            <Input />
          </Col>
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <label>{t("passport")}</label>
            <Input />
          </Col>
        </Row>

        <Row style={{ marginTop: 10 }}>
          <Col span={12}>
            <label>* {t("salary")}</label>
            <Input />
          </Col>
        </Row>

        {/* 🔹 Buttons */}
        <Row justify="end" style={{ marginTop: 20, gap: 10 }}>
          <Button>{t("reset")}</Button>
          <Button type="primary">{t("submit")}</Button>
        </Row>
      </div>

      {/* 🔹 Action */}
      <div style={{ marginTop: 20 }}>
        <input type="checkbox" /> {t("selectAll")}
        <Button danger style={{ marginLeft: 10 }}>
          {t("delete")}
        </Button>
      </div>

      {/* 🔹 Table placeholder */}
      <div style={{ marginTop: 20 }}>
        <div style={{ background: "#fff", padding: 20 }}>TABLE HERE</div>
      </div>
    </div>
  );
}

export default FormPage;
