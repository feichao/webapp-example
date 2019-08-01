import Constants from '@constants';
import Utils from '@utils';

import BaseModel from './_base-model';

class VModelLocal extends BaseModel {
  constructor(options = {}) {
    super({
      engine: Constants.GLOBAL_KEYS.MODEL_ENGINE.LOCAL_STOREAG,
      iLike: options.iLike
    });

    _assert(this.constructor !== VModelLocal, '禁止实例化 VModelLocal, 请继承 VModelLocal 实现自己的 Model 类');

    this.key = options.key;
    _assert(this.key, '当使用 VModelLocal 时, 请指定 localStorage 的 Storage Key');
  }

  get() {
    return Promise.resolve(this.parseData(Utils.Storage.lsGet(this.key))).then(this.parseData.bind(this));
  }

  set(data) {
    return Promise.resolve(Utils.Storage.lsSet(this.key, data));
  }

  remove() {
    return Promise.resolve(Utils.Storage.lsRemove(this.key));
  }
};

export default VModelLocal;
