import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ padding: 20 }}>
      <h2>{t("test1")}</h2>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => navigate("/shape")}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#6eda78",
            cursor: "pointer",
          }}
        >
          {t("layoutStyle")}
        </button>
      </div>
    </div>
  );
}

export default Home;
