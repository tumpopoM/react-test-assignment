import dayjs from "dayjs";
import type { Rule } from "antd/es/form";

export const requiredRule = (t: any) => ({
  required: true,
  message: t("required"),
});

export const numberOnlyRule = (t: any) => ({
  pattern: /^[0-9]+$/,
  message: t("numberOnly"),
});

export const phoneRule = (t: any) => ({
  pattern: /^[0-9]{8,10}$/,
  message: t("invalidPhone"),
});

export const passportRule = (t: any) => ({
  pattern: /^[0-9]{8,12}$/,
  message: t("invalidPassport"),
});

export const citizenIdRule = (t: any) => ({
  validator: (_: any, value: string[]) => {
    if (!value) {
      return Promise.reject(new Error(t("invalidCitizenId")));
    }

    const citizen = value.join("").trim();

    if (citizen.length !== 13) {
      return Promise.reject(new Error(t("invalidCitizenId")));
    }

    if (!/^[0-9]+$/.test(citizen)) {
      return Promise.reject(new Error(t("numberOnly")));
    }

    return Promise.resolve();
  },
});

export const birthdayRule = (t: any) => ({
  validator: (_: Rule, value: dayjs.Dayjs) => {
    if (!value) return Promise.resolve();

    if (value.isBefore(dayjs(), "day")) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t("invalidBirthday")));
  },
});
