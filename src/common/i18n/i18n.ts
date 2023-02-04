import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";

export const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: "en",
  returnEmptyString: false,
  fallbackLng: ["ru"],
  interpolation: {
    escapeValue: false,
  },
});
