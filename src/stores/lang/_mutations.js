import Constants from '../../constants';

import TYPES from './_types';
import { loadLanguageAsync } from '../../i18n';

export default {
  [TYPES.SET_LANG] (state, lang) {
    if (!lang) {
      return;
    }

    state.lang = {
      current: lang,
      status: Constants.GLOBAL_KEYS.STATUS.INITIAL
    };
    loadLanguageAsync(lang).then(
      () => this.commit(TYPES.SET_LANG_SUCCESS, lang),
      () => this.commit(TYPES.SET_LANG_FAIL, lang)
    );
  },
  [TYPES.SET_LANG_SUCCESS] (state, lang) {
    state.lang = {
      current: lang,
      status: Constants.GLOBAL_KEYS.STATUS.SUCCESS
    };
  },
  [TYPES.SET_LANG_FAIL] (state, lang) {
    state.lang = {
      current: lang,
      status: Constants.GLOBAL_KEYS.STATUS.FAIL
    };
  }
};
