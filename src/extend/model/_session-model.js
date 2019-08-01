import Constants from '@constants';
import Utils from '@utils';

import BaseModel from './_base-model';

class VModelSession extends BaseModel {
  constructor(options = {}) {
    super({
      engine: Constants.GLOBAL_KEYS.MODEL_ENGINE.SESSION_STORAGE,
      iLike: options.iLike
    });

    _assert(this.constructor !== VModelSession, '禁止实例化 VModelSession, 请继承 VModelSession 实现自己的 Model 类');

    this.key = options.key;
    _assert(this.key, '当使用 VModelSession 时, 请指定 sessionStorage 的 Storage Key');
  }

  get() {
    return Promise.resolve(this.parseData(Utils.Storage.ssGet(this.key))).then(this.parseData.bind(this));
  }

  set(data) {
    return Promise.resolve(Utils.Storage.ssSet(this.key, data));
  }

  remove() {
    return Promise.resolve(Utils.Storage.ssRemove(this.key));
  }
};

export default VModelSession;
