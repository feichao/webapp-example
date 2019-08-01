<!-- Created Info -->
<!-- Command: npm run make-component MXDialog -->
<!-- Created By: wanfeichao -->
<!-- Created Date: Thu May 10 2018 20:11:39 GMT+0800 (CST) -->
<template>
  <el-dialog lock-scroll :title="title" :visible.sync="visible" class="mx-dialog-container" @open="handleDialogOpen" @close="handleDialogClose" :before-close="handleDialogBeforeClose">
    <slot></slot>
    <slot name="content"></slot>
    <div slot="footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
@import './MXDialog.scss';
</style>

<script>
export default _extend({
  name: 'MxDialog',
  props: {
    title: {
      type: String,
      default: 'Dialog'
    },
    beforeClose: {
      type: Function,
      default: null
    },
    response: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    };
  },
  computed: {
    dialogInfo () {
      return this.$store.state.dialog.dialogInfo;
    }
  },
  watch: {
    dialogInfo () {
      if (this.dialogInfo.isShow) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    }
  },
  methods: {
    handleDialogOpen () {
      this.$emit('open');
    },
    handleDialogClose () {
      this.$emit('close');
    },
    handleDialogBeforeClose (done) {
      const done_ = () => {
        this.$mxDialog.close();
        done();
      };
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(done_);
      } else {
        done_();
      }
    }
  }
});
</script>
