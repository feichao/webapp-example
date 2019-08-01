// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import '@assets/styles/main.scss';

import './extend';

import router from './router';
import i18n from './i18n';
import store from './stores';

import Constants from './constants';

import './utils';
import './components';

import App from './App';

Vue.use(ElementUI);

_assert(Constants.GLOBAL_KEYS.APP_NAME, '请在 Constants.GLOBAL_KEYS 中设置 APP_NAME');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
