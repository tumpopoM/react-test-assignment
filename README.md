# 📌 React SPA - ระบบจัดการข้อมูลบุคคล

แอปพลิเคชันแบบ Single Page Application (SPA) พัฒนาด้วย React และ Antd Design สำหรับจัดการข้อมูลบุคคล โดยรองรับการทำงานแบบ CRUD ครบถ้วน พร้อม validation และรองรับหลายภาษา (i18n)

---

## 🚀 ความสามารถหลัก

### 🧾 การจัดการฟอร์ม

- เพิ่ม แก้ไข และลบข้อมูลบุคคล (Create / Edit / Delete)
- มีการตรวจสอบข้อมูล (Validation) แบบ reusable
- ช่องกรอกเลขบัตรประชาชนแบบแยกช่อง พร้อม auto focus และ validation
- รองรับการกรอกเบอร์โทรพร้อมรหัสประเทศ (Phone Code)
- ช่องเงินเดือนมีการ format ตัวเลข (comma)
- วันเกิดไม่สามารถเลือกวันปัจจุบันหรืออนาคตได้

---

### 📊 การแสดงผลตาราง

- แสดงข้อมูลในรูปแบบตาราง
- รองรับ Pagination
- รองรับการ Sort (รวมถึงเบอร์โทร)
- สามารถเลือกหลายรายการ (Row Selection)
- ลบข้อมูลได้ทั้งรายรายการและหลายรายการ
- มี Popconfirm ก่อนการลบ

---

### 🌍 รองรับหลายภาษา (i18n)

- รองรับภาษาไทยและภาษาอังกฤษ
- เปลี่ยนภาษาได้แบบ real-time
- Validation message เปลี่ยนตามภาษาอัตโนมัติ

---

### 💾 การจัดเก็บข้อมูล

- ใช้ Local Storage ในการเก็บข้อมูล
- Refresh หน้าแล้วข้อมูลไม่หาย

---

## 🧠 เทคโนโลยีที่ใช้

- React (Functional Components + Hooks)
- TypeScript
- Antd Design (UI Library)
- Redux Toolkit (State Management)
- i18next (Internationalization)
- dayjs (จัดการวันที่)

---

## 📂 โครงสร้างโปรเจค

```id="th-structure"
src/
├── components/
│   ├── LanguageSwitcher.tsx
│   ├── PersonForm.tsx
│   ├── PersonTable.tsx
│
├── hooks/
│   └── usePersonForm.ts
│
├── pages/
│   ├── FormPage.tsx
│   ├── Home.tsx
│   └── ShapePage.tsx
│
├── store/
│   ├── personSlice.ts
│   ├── itemSlice.ts
│   └── store.ts
│
├── utils/
│   └── validation.ts
│
├── i18n.ts
```

---

## ⚙️ การติดตั้งและรันโปรเจค

```bash id="th-install"
npm install
npm run dev
```

---

## ✨ รายละเอียดการพัฒนา

- แยก business logic ออกจาก UI โดยใช้ custom hook (`usePersonForm`)
- รวม validation ไว้ในที่เดียวเพื่อให้สามารถ reuse ได้
- ใช้ Redux Toolkit ในการจัดการ state ของข้อมูล
- รองรับ i18n แบบ dynamic รวมถึง validation message
- โค้ดถูกออกแบบให้แยกส่วน (Separation of Concerns) ชัดเจน

---

## 📌 หมายเหตุ

- เน้นโครงสร้างโค้ดที่อ่านง่ายและสามารถต่อยอดได้
- มีการออกแบบ UX เช่น validation feedback และ confirm dialog
- UI บางส่วนสามารถปรับปรุงเพิ่มเติมได้ในรายละเอียดเล็กน้อย

---

## 👤 ผู้พัฒนา

พัฒนาขึ้นเพื่อใช้ในการทำ Frontend Assignment โดยใช้ React และ Antd Design by Wijitra Rattanason
