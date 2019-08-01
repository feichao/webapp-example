<!-- Created Info -->
<!-- Command: npm run make-business Classroom -->
<!-- Created By: wanfeichao -->
<!-- Created Date: Wed May 09 2018 14:41:03 GMT+0800 (CST) -->
<template>
  <div class="classroom margin-auto mgt1 pd2">
    <el-row type="flex" align="middle" justify="space-between" v-tracker="'test'">
      <h1>{{ $t('Classroom') }}</h1>
      <el-button round @click="handleLoadLang">{{ $t('SwitchLang') }}</el-button>
    </el-row>
    <div class="content mgt1 pdt1 pdb1">
      <el-row v-if="hasClassroom" type="flex" class="flex-wrap">
        <div class="classroom-item mgt1 mgb1" v-for="classroom in classrooms" :key="classroom.id" @mouseenter="handleMouseEnter(classroom)" @mouseleave="handleMouseLeave(classroom)">
          <classroom-item :data="classroom"></classroom-item>
          <el-row type="flex" align="middle" justify="center" class="classroom-item-action" :class="classroom._isHover ? 'show' : ''" v-show="classroom._isHover">
            <el-button round size="mini" @click="showEditClassroomDialog(classroom)" icon="el-icon-plus">{{ $t('EditClassroom') }}</el-button>
            <el-button round size="mini" class="mgl1" @click="delClassroom(classroom)" icon="el-icon-plus">{{ $t('DelClassroom') }}</el-button>
          </el-row>
        </div>
      </el-row>
      <el-row v-else type="flex" align="middle" justify="center" class="h100">
        <el-button round @click="showAddClassroomDialog" icon="el-icon-plus">{{ $t('AddClassroom') }}</el-button>
      </el-row>
    </div>
    <div v-if="hasClassroom" class="footer pdt1">
      <el-button round @click="showAddClassroomDialog" icon="el-icon-plus">{{ $t('AddClassroom') }}</el-button>
      <el-button round class="mgl2" @click="clearClassroom" icon="el-icon-plus">{{ $t('ClearClassroom') }}</el-button>
      <el-button round class="mgl2" @click="syncClassroom" icon="el-icon-refresh">{{ $t('SyncClassroom') }}</el-button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import './Classroom.scss';
</style>

<script>
import Constants from '@constants';

import VMClassroomLocal from '@business/vmodels/classroom-local.js';
import VMClassroomRemote from '@business/vmodels/classroom-remote.js';

import ClassroomDialog from '@business/views/Classroom/ChassroomDialog/ChassroomDialog.vue';

export default _extend({
  name: 'Classroom',
  data() {
    return {
      currentLang: 0,
      langs: Array.from(new Set(Object.values(Constants.GLOBAL_KEYS.LANG))),
      classrooms: [],
    };
  },
  computed: {
    hasClassroom() {
      return this.classrooms.length;
    }
  },
  methods: {
    handleLoadLang() {
      this.currentLang++;
      this.$store.commit(this.$store.VX_TYPES.LANG.SET_LANG, this.langs[this.currentLang % 3]);
    },
    getClassrooms() {
      VMClassroomLocal.get().then((classrooms = []) => {
        this.classrooms = classrooms;
      });
    },
    showAddClassroomDialog() {
      this.$mxDialog.show(ClassroomDialog).then(() => {
        this.getClassrooms();
      }).catch(() => _info('用户取消创建'));
    },
    showEditClassroomDialog(data) {
      this.$mxDialog.show(ClassroomDialog, data).then(() => {
        this.getClassrooms();
      }).catch(() => _info('用户取消编辑'));
    },
    clearClassroom() {
      VMClassroomLocal.delete().then(() => {
        this.getClassrooms();
      });
    },
    syncClassroom() {
      VMClassroomRemote.sync().then(data => {
        this.$message('同步成功');
      });
    },
    delClassroom(data) {
      VMClassroomLocal.delete(data.id).then(() => {
        this.getClassrooms();
      });
    },
    handleMouseEnter(data) {
      this.$set(data, '_isHover', true);
    },
    handleMouseLeave(data) {
      this.$set(data, '_isHover', false);
    }
  },
  mounted() {
    this.getClassrooms();
    VMClassroomRemote.get().then(data => {
      this.$message('成功获取远程数据');
    });
  }
});
</script>
