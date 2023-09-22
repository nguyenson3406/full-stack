import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LanguageUtils } from '../../utils';

const messages = LanguageUtils.getFlattenedMessages();

const resources = {
    vi: {
        translation: messages.vi
    },
    en: {
        translation: messages.en
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "vi",
        debug: false,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        ns: "translation",
        defaultNS: "translation"
    });

export default i18n;