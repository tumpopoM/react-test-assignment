import ShapeGrid from "../components/ShapeGrid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

function ShapePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => navigate("/")}>{t("back")}</Button>

      <ShapeGrid />
    </div>
  );
}

export default ShapePage;
