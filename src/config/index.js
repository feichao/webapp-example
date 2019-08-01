import Vue from 'vue';

import ConfigLocal from './config.local';
import ConfigDev from './config.dev';
import ConfigTest from './config.test';
import ConfigProd from './config.prod';

/**
 * Vue 配置选项
 */
Vue.config.productionTip = false;

// development 本地开发模式
const IS_LOCAL_ENV = process.env.NODE_ENV === 'development';
// production 线上生产模式: 开发环境, 测试环境, 正式环境
const IS_BUILD_ENV = process.env.NODE_ENV === 'production';

/**
 * DEV: 开发环境
 * STAGING: 测试环境
 * MASTER: 正式环境
 */
const BUILD_ENV = process.env.BUILD_ENV;

let realConfig;
if (IS_LOCAL_ENV) {
  realConfig = ConfigLocal;
}

if (IS_BUILD_ENV) {}

switch (BUILD_ENV) {
  case 'DEV':
    realConfig = ConfigDev;
    break;
  case 'STAGING':
    realConfig = ConfigTest;
    break;
  case 'MASTER':
    realConfig = ConfigProd;
    break;
  default: break;
}

export default {
  IS_LOCAL: realConfig === ConfigLocal,
  BASE_URL: realConfig.BASE_URL,
  FRIDAY_TRACKER_ID: realConfig.FRIDAY_TRACKER_ID
};
