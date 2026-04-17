import { message } from "antd";
import { useDispatch } from "react-redux";
import { addPerson, updatePerson } from "../store/personSlice";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

export const usePersonForm = (
  form: any,
  editingId: string | null,
  setEditingId: (id: string | null) => void,
) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const normalizePhone = (number: string) => {
    return number.replace(/^0+/, "");
  };

  const formatPhone = (code: string, number: string) => {
    if (!number) return "";

    if (code === "+66") {
      const cleaned = normalizePhone(number);
      return "0" + cleaned;
    }

    return number;
  };

  const onFinish = (values: any) => {
    const citizenId = values.citizenId?.join("");
    const newPerson = {
      id: editingId || uuidv4(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
      phoneCode: values.phoneCode,
      phone: formatPhone(values.phoneCode, values.phoneNumber),
      nationality: values.nationality,
      citizenId: citizenId,
      passport: values.passport,
      salary: Number(values.salary),
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
    };

    if (editingId) {
      dispatch(updatePerson(newPerson));
      message.success(t("updateSuccess"));
    } else {
      dispatch(addPerson(newPerson));
      message.success(t("saveSuccess"));
    }

    setEditingId(null);
    form.resetFields();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("FAILED:", errorInfo);
  };

  return {
    onFinish,
    onFinishFailed,
    normalizePhone,
  };
};
