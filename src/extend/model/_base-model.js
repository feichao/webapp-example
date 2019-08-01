import Constants from '@constants';

const MODEL_ENGINS = Object.keys(Constants.GLOBAL_KEYS.MODEL_ENGINE).map(key => Constants.GLOBAL_KEYS.MODEL_ENGINE[key]);

const isValid = iLike => {
  if (iLike === String || iLike === Number || iLike === Boolean || iLike === null || iLike === undefined ||
    typeof iLike === 'string' || typeof iLike === 'number' || typeof iLike === 'boolean') {
    return true;
  }
  if (iLike instanceof Function) {
    return false;
  }

  if (Array.isArray(iLike)) {
    const length = iLike.length;
    if (length === 0) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (!isValid(iLike[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeof iLike === 'object') {
    return isValid(Object.keys(iLike).map(ii => iLike[ii]));
  }

  return true;
};

const parseData = (data, iLike) => {
  if (iLike === String) {
    return (data === null || data === undefined) ? '' : data.toString();
  }
  if (iLike === Number) {
    return +data;
  }
  if (iLike === Boolean) {
    return !!data;
  }
  if (typeof iLike === 'string' || typeof iLike === 'number' || typeof iLike === 'boolean' || iLike === null || iLike === undefined) {
    return iLike;
  }
  if (Array.isArray(iLike)) {
    if (!Array.isArray(data)) {
      _error('期望一个数组, 得到的是其他类型: ', data);
      return [];
    }
    const dataLen = data.length;
    const iLikeLen = iLike.length;
    if (iLikeLen === 1) {
      return data.map(d => {
        return parseData(d, iLike[0]);
      });
    } else if (dataLen === iLikeLen) {
      return data.map((d, index) => {
        return parseData(d, iLike[index]);
      });
    } else if (dataLen > iLikeLen) {
      const data1 = data.splice(0, iLikeLen);
      return parseData(data1, iLike).concat(parseData(data, [iLike[iLikeLen - 1]]));
    } else {
      return parseData(data, iLike.slice(0, dataLen));
    }
  }
  if (typeof iLike === 'object') {
    if (Object.prototype.toString.call(data) !== '[object Object]') {
      _error('期望一个对象, 得到的是其他类型: ', data);
      return {};
    }
    const result = {};
    Object.keys(iLike).forEach(key => {
      result[key] = parseData(data[key], iLike[key]);
    });
    return result;
  }
};

class VModel {
  constructor(options = {}) {
    _assert(this.constructor !== VModel, '禁止实例化 VModel, 请继承 VModel 实现自己的 Model 类');
    _assert(~MODEL_ENGINS.indexOf(options.engine), '请指定 VModel 的 engine');
    this.engine = options.engine;

    if (this.engine === Constants.GLOBAL_KEYS.MODEL_ENGINE.LOCAL_STOREAG || this.engine === Constants.GLOBAL_KEYS.MODEL_ENGINE.SESSION_STORAGE) {
      _assert(options.iLike, '请指定 VModel 调用 GET 操作时的期望数据类型');
    }

    if (options.iLike) {
      _assert(isValid(options.iLike), `如果 VModel 的期望数据包含 Object 或者 Array, 请使用直接量指定对象每个属性的类型, 并且数组不能为空. 目前支持对象直接量, 数组直接量, 基本数据类型(number, string, boolean).`);
    }

    /**
     * 如果期望数据是对象, 则需要指定每个属性的类型
     * 1.比如期望数据为对象
     *    {
     *      id: Number,
     *      name: String,
     *      students: [{
     *        name: String
     *      }]
     *    }
     *   当实际返回数据为
     *    {
     *      id: '99001'
     *      name: 'MX BB',
     *      desc: 'MX BB IS A BIG ONE ~',
     *      students: [{
     *        id: '001',
     *        name: 'MX 01'
     *      }, {
     *        id: '002',
     *        name: 'MX 02'
     *      }, {
     *        id: '003',
     *        name: 'MX 03'
     *      }]
     *    }
     *   则最终返回数据为
     *    {
     *      id: 99001                     // 转换为 Number
     *      name: 'MX BB',                // 删除 desc 属性
     *      students: [{
     *        name: 'MX 01'               // 删除 id 属性
     *      }, {
     *        name: 'MX 02'               // 删除 id 属性
     *      }, {
     *        name: 'MX 03'               // 删除 id 属性
     *      }]
     *    }
     *
     *  2.比如期望数据为数组, 如果期望数据的长度为 1, 则所有的返回数据以第 1 个期望数据格式化,
     *    如果期望数据的长度大于 1, 则返回数据的第 1 个以第 1 个期望数据格式化, 则返回数据的第 2 个以第 2 个期望数据格式化, 以此类推, 剩下的则以最后一个期望数据格式化
     *    期望的数据类型:
     *    [
     *      {
     *        id: String,
     *        name: String,
     *      },
     *      {
     *        id: Number,
     *        name: String,
     *      }
     *    ]
     *    返回的实际数据:
     *    [
     *      {
     *        id: '001',
     *        name: 'MX 01'
     *      }, {
     *        id: '002',
     *        name: 'MX 02'
     *      }, {
     *        id: '003',
     *        name: 'MX 03'
     *      }
     *    ]
     *    则最终返回数据为:
     *    [
     *      {
     *        id: '001',                   // 还是 String
     *        name: 'MX 01'
     *      }, {
     *        id: 2,                       // 转换为 Number
     *        name: 'MX 02'
     *      }, {
     *        id: 3,                       // 转换为 Number
     *        name: 'MX 03'
     *      }
     *    ]
     *
     *  3.比如期望数据为基本类型 String
     *    当实际返回数据为 12345, 则最终返回数据为 '12345'                // 转换为 String
     *    当实际返回数据为 [1, 2, 3, 4], 则最终返回数据为 '1,2,3,4'       // 转换为 String
     */
    this.iLike = options.iLike;
  }

  setILike(iLike) {
    this.iLike = iLike;
  }

  isILikeValid(iLike) {
    return isValid(iLike);
  }

  parseData(data) {
    return parseData(data, this.iLike);
  }
};

export default VModel;
