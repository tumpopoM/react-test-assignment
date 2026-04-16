import { Button, Space } from "antd";
import i18n from "../i18n";

function LanguageSwitcher() {
  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}
    >
      <Space>
        <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
        <Button onClick={() => i18n.changeLanguage("th")}>TH</Button>
      </Space>
    </div>
  );
}

export default LanguageSwitcher;
