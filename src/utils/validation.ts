import dayjs from "dayjs";
import type { Rule } from "antd/es/form";
import i18n from "i18next";

export const requiredRule = () => ({
  required: true,
});

export const numberOnlyRule = (t: any) => ({
  validator: (_: any, value: string) => {
    if (!value) return Promise.resolve();

    if (!/^[0-9]+$/.test(value)) {
      return Promise.reject(new Error(i18n.t("numberOnly")));
    }

    return Promise.resolve();
  },
});

export const phoneRule = (t: any) => ({
  validator: (_: any, value: string) => {
    if (!value) return Promise.resolve();

    if (!/^[0-9]{8,10}$/.test(value)) {
      return Promise.reject(new Error(i18n.t("invalidPhone")));
    }

    return Promise.resolve();
  },
});

export const passportRule = (t: any) => ({
  validator: (_: any, value: string) => {
    if (!value) return Promise.resolve();

    if (!/^[0-9]{8,12}$/.test(value)) {
      return Promise.reject(new Error(i18n.t("invalidPassport")));
    }

    return Promise.resolve();
  },
});

export const citizenIdRule = (t: any) => ({
  validator: (_: any, value: string[]) => {
    if (!value) {
      return Promise.reject(new Error(i18n.t("invalidCitizenId")));
    }

    const citizen = value.join("").trim();

    if (citizen.length !== 13) {
      return Promise.reject(new Error(i18n.t("invalidCitizenId")));
    }

    if (!/^[0-9]+$/.test(citizen)) {
      return Promise.reject(new Error(i18n.t("numberOnly")));
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

    return Promise.reject(new Error(i18n.t("invalidBirthday")));
  },
});
