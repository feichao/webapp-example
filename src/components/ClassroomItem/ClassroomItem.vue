<!-- Created Info -->
<!-- Command: npm run make-component ClassroomItem -->
<!-- Created By: wanfeichao -->
<!-- Created Date: Wed May 09 2018 16:41:14 GMT+0800 (CST) -->
<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <span class="label">{{ $t('ClassroomName') }}: </span>
      <span class="value">{{ data.name }}</span>
    </el-row>
    <el-row type="flex" justify="space-between">
      <span class="label">{{ $t('ClassroomMaster') }}: </span>
      <span class="value">{{ data.master || '暂无' }}</span>
    </el-row>
    <el-row type="flex" justify="space-between">
      <span class="label">{{ $t('ClassroomStudents') }}: </span>
      <span class="value">{{ data.students }}</span>
    </el-row>
  </div>
</template>

<style lang="sass" scoped>
@import './ClassroomItem.scss';
</style>

<script>
export default _extend({
  name: 'ClassroomItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
});
</script>
