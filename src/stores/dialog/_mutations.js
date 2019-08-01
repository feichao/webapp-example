import TYPES from './_types';

export default {
  [TYPES.SHOW_DIALOD] (state, dialogInfo = {}) {
    const { innerComponent, dialogProps } = dialogInfo;
    if (!innerComponent) {
      _error('弹框中的组件不能为空');
      return;
    }

    state.dialogInfo = {
      innerComponent,
      dialogProps,
      isShow: true
    };
    // 延迟因为 element-ui 弹出框有动画, 动画完成后再加载 dialog 里面的 component
    setTimeout(() => {
      state.dialogInfo = Object.assign({}, state.dialogInfo, {
        innerComponent,
        dialogProps,
        isShow: true
      });
    }, 60);
  },
  [TYPES.HIDE_DIALOD] (state) {
    state.dialogInfo = Object.assign({}, state.dialogInfo, {
      isShow: false
    });
    setTimeout(() => {
      state.dialogInfo = Object.assign({}, state.dialogInfo, {
        innerComponent: null,
        dialogProps: null
      });
    }, 120);
  }
};
