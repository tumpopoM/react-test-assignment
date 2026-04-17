import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Row, Col } from "antd";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginTop: 20 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              style={cardStyle}
              onClick={() => navigate("/form")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffa200";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
              }}
            >
              <h3>{t("test1")}</h3>
              <p>({t("layoutStyle")})</p>
            </Card>
          </Col>

          <Col span={8}>
            <Card
              hoverable
              style={cardStyle}
              onClick={() => navigate("/form")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffa200";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
              }}
            >
              <h3>{t("test2")}</h3>
              <p>({t("formTable")})</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
const cardStyle = {
  borderRadius: 12,
  textAlign: "center" as const,
  cursor: "pointer",
  transition: "0.3s",
};

export default Home;
