import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

// resources
import En from './locales/en.json';
import ZhTW from './locales/zh-Tw.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: true,
  fallbackLng: 'zh-TW',
  lng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    'zh-TW': { translation: ZhTW },
    en: { translation: En },
  },
});

export default i18next;
