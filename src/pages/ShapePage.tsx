import ShapeGrid from "../components/ShapeGrid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

function ShapePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div style={{ marginTop: 20 }}>
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
      <ShapeGrid />
    </div>
  );
}

export default ShapePage;
