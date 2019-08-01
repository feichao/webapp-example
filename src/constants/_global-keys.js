export default Object.freeze({
  APP_NAME: 'webapp',
  /**
   * 支持的语言列表
   */
  LANG: {
    DEFAULT: 'zh-CN',
    ZH_CN: 'zh-CN',
    ZH_HK: 'zh-HK',
    EN: 'en'
  },

  /**
   * 本地存储的键
   */
  STORAGE: {
    LANG: '$lang',
    DEBUG_SWITCH: '$debug_switch',
    DEBUG_LEVEL: '$debug_level',
    CLASSROOM: '$classroom'
  },

  /**
   * 三态常量
   */
  STATUS: {
    SUCCESS: 1000,
    FAIL: -1000,
    INITIAL: 0
  },
  MODEL_ENGINE: {
    LOCAL_STOREAG: 1203,
    SESSION_STORAGE: 1204,
    HTTP: 1205
  },
});
