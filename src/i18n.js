import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';

const storedLanguage = localStorage.getItem("language") || "pt";

const resources = {
    en: { translation: enTranslation },
    pt: { translation: ptTranslation },
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storedLanguage, // Idioma inicial baseado no que ja ta salvo
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng)
})

    export default i18n
