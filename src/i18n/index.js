import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

import Constants from '../constants';

import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from 'element-ui/lib/locale/lang/en';

import localZHCNLocale from './_zh-CN.js';
import localENLocale from './_en.js';

Vue.use(VueI18n);

const locale = Constants.GLOBAL_KEYS.LANG.ZH_CN;

const i18n = new VueI18n({
  locale,
  fallbackLocale: locale,
  messages: {
    [Constants.GLOBAL_KEYS.LANG.ZH_CN]: { ...zhLocale, ...localZHCNLocale },
    [Constants.GLOBAL_KEYS.LANG.EN]: { ...enLocale, ...localENLocale }
  }
});

export default i18n;

const loadedLanguages = [locale];

function setI18nLanguage (lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(`./_${lang}.js`).then((appMsgs) => {
        i18n.setLocaleMessage(lang, { ...appMsgs.default });
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}
