import Constants from '../../constants';

const prefix = Constants.GLOBAL_KEYS.APP_NAME;
const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

if (!localStorage || !sessionStorage) {
  throw new Error('localStorage not supported');
}

const format = key => `${prefix}.${key}`;
export default {
  lsGet (key) {
    const value = localStorage.getItem(format(key));
    try {
      return JSON.parse(value);
    } catch (exception) {
      _error(exception);
    }
  },
  lsSet (key, value) {
    localStorage.setItem(format(key), JSON.stringify(value));
  },
  lsRemove (key) {
    localStorage.removeItem(format(key));
  },
  ssGet (key) {
    const value = sessionStorage.getItem(format(key));
    try {
      return JSON.parse(value);
    } catch (exception) {
      _error(exception);
    }
  },
  ssSet (key, value) {
    sessionStorage.setItem(format(key), JSON.stringify(value));
  },
  ssRemove (key) {
    sessionStorage.removeItem(format(key));
  }
};
