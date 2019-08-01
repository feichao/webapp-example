/* eslint no-console: 0 */
import Vue from 'vue';
import FridayAgent from '@cvte/fridayagent3';

import config from '../config';
import store from '../stores';

Vue.use(FridayAgent, config.FRIDAY_TRACKER_ID || 'local development');

const noop = () => { };

/**
 * VUE 实例弹框方法
 */
Vue.prototype.$mxDialog = (function () {
  let dResolve = noop;
  let dReject = noop;
  return {
    show (innerComponent, dialogProps) {
      store.commit(store.VX_TYPES.DIALOG.SHOW_DIALOD, {
        innerComponent,
        dialogProps
      });
      return new Promise((resolve, reject) => {
        dResolve = resolve;
        dReject = reject;
      });
    },
    hide (result) {
      store.commit(store.VX_TYPES.DIALOG.HIDE_DIALOD);
      dResolve(result);
    },
    close (result) {
      store.commit(store.VX_TYPES.DIALOG.HIDE_DIALOD);
      dReject(result);
    }
  };
})();

/**
 * 全局错误处理
 */
const errorList = [];
const myPushError = err => {
  const pushError = window.reporter && typeof window.reporter.pushError === 'function' ? window.reporter.pushError : noop;
  if (pushError === noop) {
    errorList.push(err);
  } else {
    pushError(err);
    while (errorList.length && pushError(errorList.pop()));
  }
};

// 图片加载失败
window._$$_handleImgLoadError_$$_ = function(event) {
  const target = event.target || {};
  _error(`加载图片 ${target.src} 失败, 图片的 alt 为 ${target.alt}`);
  myPushError({
    file: target.src,
    lineNo: 0,
    abstract: target.alt,
    message: `加载图片 ${target.src} 失败, 图片的 alt 为 ${target.alt}`
  });
};

// 非组件错误
window.addEventListener('error', function (event) {
  _error(event);
  myPushError({
    file: event.filename,
    lineNo: event.lineno,
    abstract: event.message,
    message: event.error && event.error.stack
  });
});

// 组件生命周期中的错误
Vue.config.errorHandler = function (err, vm, info) {
  _error(err);
  myPushError({
    file: vm && vm.$options && vm.$options.name,
    lineNo: 0,
    abstract: info,
    message: err
  });
};

/**
 * 性能监控
 */
window.pushPreformance = window.reporter && typeof window.reporter.pushPreformance === 'function' ? window.reporter.pushPreformance : noop;
