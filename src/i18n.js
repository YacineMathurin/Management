import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_FR } from "./locales/fr/translation";
import { TRANSLATIONS_EN } from "./locales/en/translation";

// the translations
var lang = navigator.language || navigator.userLanguage;
console.log("lang", lang.substring(0, 2));
const defaultLanguage =
  lang.substring(0, 2) === "fr"
    ? "fr"
    : lang.substring(0, 2) === "es"
    ? "es"
    : "en";

const resources = {
  en: {
    translation: TRANSLATIONS_EN,
  },
  fr: {
    translation: TRANSLATIONS_FR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: defaultLanguage,
    detection: { order: ["path", "navigator"] },
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
