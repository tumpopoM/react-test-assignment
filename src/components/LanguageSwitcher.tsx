import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}
    >
      <Space>
        {/* <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
        <Button onClick={() => i18n.changeLanguage("th")}>TH</Button> */}
        <Select
          value={i18n.language}
          onChange={(value) => i18n.changeLanguage(value)}
          style={{ width: 80 }}
          options={[
            { value: "en", label: "EN" },
            { value: "th", label: "TH" },
          ]}
        />
      </Space>
    </div>
  );
}

export default LanguageSwitcher;
