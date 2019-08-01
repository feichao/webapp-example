/* eslint no-console: 0 */
import config from '../config';
import Constants from '../constants';
import _ from '../utils';

const noop = () => { };
const DEBUG_LEVEL_INFO = 1;
const DEBUG_LEVEL_DEBUG = 2;
const DEBUG_LEVEL_WARN = 3;
const DEBUG_LEVEL_ERROR = 4;

const _debugLevel = _.Storage.lsGet(Constants.GLOBAL_KEYS.STORAGE.DEBUG_LEVEL);
let debugLevel = +_debugLevel || DEBUG_LEVEL_DEBUG;

const _isDebug = _.Storage.lsGet(Constants.GLOBAL_KEYS.STORAGE.DEBUG_SWITCH);
let isDebug = config.IS_LOCAL || !!_isDebug;

window._assert = noop;
if (config.IS_LOCAL) {
  window._assert = (...args) => {
    if (!args[0]) {
      throw new Error(args[1]);
    }
  };
}
const init = () => {
  window._info = noop;
  window._log = noop;
  window._warn = noop;
  window._error = noop;
  window._timeStart = noop;
  window._timeEnd = noop;

  if (isDebug) {
    if (debugLevel <= DEBUG_LEVEL_ERROR) {
      window._error = console.log.bind(window.console, '%cError:', 'background: red;');
    }
    if (debugLevel <= DEBUG_LEVEL_WARN) {
      window._warn = console.log.bind(window.console, '%cWarning:', 'background: rgb(255, 251, 200);');
    }
    if (debugLevel <= DEBUG_LEVEL_DEBUG) {
      window._log = console.log.bind(window.console, '%cDebug:', 'color: rgb(30, 30, 30);');
    }
    if (debugLevel <= DEBUG_LEVEL_INFO) {
      window._info = console.log.bind(window.console, '%cInfo:', 'color: rgb(128, 128, 128);');
      if (typeof console.time === 'function') {
        window._timeStart = console.time.bind(window.console);
      }
      if (typeof console.timeEnd === 'function') {
        window._timeEnd = console.timeEnd.bind(window.console);
      }
    }
  }
};

Object.defineProperty(window, '__debug_webapp_level__', {
  enumerable: false,
  configurable: true,
  get () {
    return debugLevel;
  },
  set (value) {
    debugLevel = value;
    _.Storage.lsSet(Constants.GLOBAL_KEYS.STORAGE.DEBUG_LEVEL, debugLevel);
    init();
  }
});
Object.defineProperty(window, '__debug_webapp__', {
  enumerable: false,
  configurable: true,
  get () {
    return isDebug;
  },
  set (value) {
    isDebug = value;
    _.Storage.lsSet(Constants.GLOBAL_KEYS.STORAGE.DEBUG_SWITCH, isDebug);
    init();
  }
});

window.__debug_webapp__ = isDebug;
