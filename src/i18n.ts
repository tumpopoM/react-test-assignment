import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        addItem: "Add Item",
        name: "Name",
        age: "Age",
        action: "Action",
        submit: "Submit",
        update: "Update",
        itemList: "Items List",
        edit: "Edit",
        delete: "Delete",
      },
    },
    th: {
      translation: {
        addItem: "เพิ่มข้อมูล",
        name: "ชื่อ",
        age: "อายุ",
        action: "การกระทำ",
        submit: "บันทึก",
        update: "อัปเดต",
        itemList: "รายการ",
        edit: "แก้ไข",
        delete: "ลบ",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
