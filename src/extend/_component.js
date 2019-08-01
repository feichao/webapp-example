const mixin = {
  data() {
    return {
      __startLoadTimestamp__: 0,
      __loadedTimestamp__: 0,
      __destroyTimestamp__: 0
    };
  },
  beforeCreate() {
    this.__startLoadTimestamp__ = +new Date();
    _info(`${this._uid}.${this.$options.name} beforeCreate`);
    _timeStart(`组件 ${this._uid}.${this.$options.name} 的渲染时间为`);
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.__loadedTimestamp__ = +new Date();
    window.pushPreformance({
      componentName: this.$options.name,
      load: 0,
      render: this.__loadedTimestamp__ - this.__startLoadTimestamp__
    });
    _info(`${this._uid}.${this.$options.name} mounted`);
    _timeEnd(`组件 ${this._uid}.${this.$options.name} 的渲染时间为`);
  },
  beforeUpdate() {
    _info(`${this._uid}.${this.$options.name} beforeUpdate`);
  },
  updated() {},
  beforeDestroy() {},
  destroyed() {
    this.__destroyTimestamp__ = +new Date();
    _info(`${this._uid}.${this.$options.name} destroyed`);
  }
};

if (!window._extend) {
  window._extend = componentObj => {
    _assert(typeof componentObj === 'object' && componentObj !== null, '组件对象不合法');
    _assert(componentObj.name, '组件名不能为空');
    _assert(/^[A-Z]/.test(componentObj.name), '组件名必须以大写字母开头');
    _assert(componentObj.mixins === undefined || Array.isArray(componentObj.mixins), '组件的 mixins 必须是 undefined 或者数组');

    componentObj.mixins = [].concat(componentObj.mixins || [], [mixin]);
    return componentObj;
  };
}
