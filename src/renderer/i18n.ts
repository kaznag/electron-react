import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        language: 'Language',
        counter: 'Counter',
      },
    },
    ja: {
      translation: {
        language: '言語',
        counter: 'カウンタ',
      },
    },
  },
});
