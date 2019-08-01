'use strict'
const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  loaders: {
    ...utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    })
  },
  preLoaders: {
    js: require.resolve('./loaders/check-extend-loader.js'),
    html: require.resolve('./loaders/resource-error-loader.js')
  },
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
