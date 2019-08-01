import Vue from 'vue';
import Vuex from 'vuex';

import dialog from './dialog';
import global from './global';
import lang from './lang';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    lang,
    dialog,
    global
  },
});

store.VX_TYPES = {
  DIALOG: dialog.types,
  LANG: lang.types,
  GLOBAL: global.types
};

export default store;
