import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_FR } from "./locales/fr/translation";
import { TRANSLATIONS_EN } from "./locales/en/translation";

// the translations
const resources = {
  english: {
    translation: TRANSLATIONS_EN,
  },
  francais: {
    translation: TRANSLATIONS_FR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "english",
    fallbackLng: "english",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
