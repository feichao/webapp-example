<template>
  <div id="app">
    <router-view/>
    <component :is="dialogInfo.innerComponent"></component>
  </div>
</template>

<script>
export default _extend({
  name: 'App',
  computed: {
    fetchError () {
      return this.$store.state.global.fetchError;
    },
    dialogInfo () {
      return this.$store.state.dialog.dialogInfo;
    }
  },
  watch: {
    fetchError () {
      const error = this.fetchError;
      switch (error.code) {
        default:
          this.$message.error({
            message: error.msg || '未知错误'
          });
          break;
      }
    }
  },
  beforeCreate() {
    _timeEnd('page load');
  },
  mounted() {
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 36px;
  text-align: center;
}
</style>
