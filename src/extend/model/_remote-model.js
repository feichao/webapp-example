import axios from 'axios';

import BaseModel from './_base-model';
import store from '../../stores';
import config from '@config';
import Constants from '@constants';
/**
 * @param {String} url request url
 * @param {Object} params request params
 * 例如:
 *  url: /api/:id/delete?from=:from&end=:end
 *  params: {
 *    id: 12345,
 *    from: '2018-05-09',
 *    end: '2018-05-10',
 *    refresh: true,
 *    state: 'powerOn'
 *  }
 *
 * 结果是: /api/12345/delete?from=2018-05-09&end=2018-05-10&refresh=true&state=powerOn
 */
const parseUrl = (url, params) => {
  const reg = /:(\w+)/gi;
  const urlParams = url.match(reg);
  if (Array.isArray(urlParams)) {
    urlParams.forEach(urlParam => {
      const keyName = urlParam.replace(':', '');
      if (params[keyName]) {
        url = url.replace(':' + keyName, params[keyName]);
        delete params[keyName];
      }
    });
  }

  const lastParam = Object.keys(params).map(key => {
    return `${key}=${params[key]}`;
  }).join('&');

  if (/\?/.test(url)) {
    return url + '&' + lastParam;
  } else {
    return url + '?' + lastParam;
  }
};

const fetchSuccess = (ret, options) => {
  return ret && ret.data;
};

const fetchError = (response = {}, options = {}) => {
  const errorBody = response.data;
  if (errorBody.code) {
    errorBody.code = isNaN(+errorBody.code) ? errorBody.code : +errorBody.code;
  }
  if (!options.preventDefaultNotify) {
    store.commit(store.VX_TYPES.GLOBAL.FETCH_ERROR, errorBody);
  }
  return Promise.reject(errorBody);
};

axios.defaults.baseURL = config.BASE_URL;
if (!config.IS_LOCAL) {
  axios.defaults.withCredentials = true;
}

class VModelHttp extends BaseModel {
  constructor(options = {}) {
    super({
      engine: Constants.GLOBAL_KEYS.MODEL_ENGINE.HTTP,
      iLike: options.iLike
    });

    _assert(this.constructor !== VModelHttp, '禁止实例化 VModelHttp, 请继承 VModelHttp 实现自己的 Model 类');

    _assert(options.url, '当使用 HTTP 时, 请指定请求路径 url');
    this.baseURL = options.baseURL || config.BASE_URL;
    this.url = options.url;
  }

  _wrapGetDeleteOptions (url, options) {
    if (typeof url === 'string' && !options) { // get(url)
      return {
        baseURL: this.baseURL,
        url: url
      };
    }

    if (url && typeof url === 'object') { // get(options)
      if (!url.baseURL) {
        url.baseURL = this.baseURL;
      }
      if (!url.url) {
        url.url = this.url;
      }
      if (url.params && typeof url.params === 'object') {
        url.url = parseUrl(url.url, url.params);
        delete url.params;
      }
      return url;
    }

    if (typeof url === 'string' && options && typeof options === 'object') { // get(url, options)
      options.url = url;

      if (!options.baseURL) {
        options.baseURL = this.baseURL;
      }
      if (options.params && typeof options.params === 'object') {
        options.url = parseUrl(options.url, options.params);
        delete options.params;
      }
      return options;
    }

    return { // get()
      baseURL: this.baseURL,
      url: this.url
    };
  }

  _wrapPostPutOptions (url, options) {
    if (typeof url === 'string' && !options) { // post(url)
      return {
        baseURL: this.baseURL,
        url: url
      };
    }

    if (typeof url === 'string' && options && typeof options === 'object') { // post(url, data)
      return {
        baseURL: this.baseURL,
        url: url,
        data: options
      };
    }

    if (url && typeof url === 'object' && !options) { // post(data)
      return {
        baseURL: this.baseURL,
        url: this.url,
        data: url
      };
    }

    if (url && typeof url === 'object' && options && typeof options === 'object') { // post(data, options)
      if (!options.baseURL) {
        options.baseURL = this.baseURL;
      }
      if (!options.url) {
        options.url = this.url;
      }
      if (options.params && typeof options.params === 'object') {
        options.url = parseUrl(options.url, options.params);
        delete options.params;
      }

      options.data = url;

      return options;
    }

    return { // post()
      baseURL: this.baseURL,
      url: this.url
    };
  }

  /**
   * HTTP 请求
   *  get / delete
   *    get()
   *    get(url: String)
   *    get(url: String, options: Object)
   *    get(options: String)
   *
   *  post / put
   *    post()
   *    post(url: String)
   *    post(url: String, data: Object)
   *    post(data: Object)
   *    post(data: Object, options: Object)
   */
  get (url, options) { // get
    _assert(this.iLike || (options && options.iLike), '请指定 VModel 调用 GET 操作时的期望数据类型');

    if (options.iLike) {
      this.setILike(options.iLike);
      _assert(this.isILikeValid(this.iLike), `如果 VModel 的期望数据包含 Object 或者 Array, 请使用直接量指定对象每个属性的类型, 并且数组不能为空. 目前支持对象直接量, 数组直接量, 基本数据类型(number, string, boolean).`);
    }

    const _options = this._wrapGetDeleteOptions(url, options);
    _options.method = 'get';
    return axios.request(_options).then(ret => fetchSuccess(ret, options)).catch(err => fetchError(err.response, options)).then(this.parseData.bind(this));
  }

  put (url, options) {
    const _options = this._wrapPostPutOptions(url, options);
    _options.method = 'put';
    return axios.request(_options).then(ret => fetchSuccess(ret, options)).catch(err => fetchError(err.response, options));
  }

  post (url, options) {
    const _options = this._wrapPostPutOptions(url, options);
    _options.method = 'post';
    return axios.request(_options).then(ret => fetchSuccess(ret, options)).catch((err) => fetchError(err.response, options));
  }

  delete (url, options) { // delete
    const _options = this._wrapGetDeleteOptions(url, options);
    _options.method = 'delete';
    return axios.request(_options).then(ret => fetchSuccess(ret, options)).catch(err => fetchError(err.response, options));
  }
};

export default VModelHttp;
