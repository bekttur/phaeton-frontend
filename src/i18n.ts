import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import kzMenu from "../public/locales/kz/menu.json";
import ruMenu from "../public/locales/ru/menu.json";

import kzSearch from "../public/locales/kz/search.json";
import ruSearch from "../public/locales/ru/search.json";

import kzHome from "../public/locales/kz/home.json";
import ruHome from "../public/locales/ru/home.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      kz: {
        menu: kzMenu,
        search: kzSearch,
        home: kzHome,
      },
      ru: {
        menu: ruMenu,
        search: ruSearch,
        home: ruHome,
      },
    },
    fallbackLng: "ru",
    ns: ["menu", "search", "home"],
    defaultNS: "menu",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;