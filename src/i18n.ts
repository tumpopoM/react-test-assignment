import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        test1: "Test 1",
        layoutStyle: "Layout & Style",
        moveShape: "Move Shape",
        movePosition: "Move Position",
        addItem: "Add Item",
        name: "Name",
        age: "Age",
        action: "Action",
        submit: "Submit",
        update: "Update",
        itemList: "Items List",
        edit: "Edit",
        delete: "Delete",
        back: "Back",
      },
    },
    th: {
      translation: {
        test1: "แบบทดสอบที่ 1",
        layoutStyle: "เลย์เอาต์และสไตล์",
        moveShape: "เลื่อนรูปทรง",
        movePosition: "สลับตำแหน่ง",
        addItem: "เพิ่มข้อมูล",
        name: "ชื่อ",
        age: "อายุ",
        action: "การกระทำ",
        submit: "บันทึก",
        update: "อัปเดต",
        itemList: "รายการ",
        edit: "แก้ไข",
        delete: "ลบ",
        back: "ย้อนกลับ",
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
