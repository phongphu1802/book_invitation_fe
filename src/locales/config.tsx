import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import adminEn from "./en/admin.json";
import systemEn from "./en/system.json";
import userEn from "./en/user.json";
import authEn from "./en/auth.json";
import commonEn from "./en/common.json";

export const resources = {
  en: {
    admin: adminEn,
    user: userEn,
    system: systemEn,
    auth: authEn,
    common: commonEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    ns: ["admin", "user", "system", "auth", "common"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
