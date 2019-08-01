<!-- Created Info -->
<!-- Command: npm run make-business Classroom/ChassroomDialog -->
<!-- Created By: wanfeichao -->
<!-- Created Date: Thu May 10 2018 20:08:36 GMT+0800 (CST) -->
<template>
  <mx-dialog :title="`${isEdit ? $t('EditClassroom') : $t('AddClassroom')}`" class="classroom-dialog">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="$t('ClassroomName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('ClassroomMaster')" prop="master">
        <el-input v-model="form.master"></el-input>
      </el-form-item>
      <el-form-item :label="$t('ClassroomStudents')" prop="students">
        <el-input v-model.number="form.students"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close" v-t="{path: 'Cancel'}"></el-button>
      <el-button type="primary" @click="confirm" v-t="{path: 'Confirm'}"></el-button>
    </div>
  </mx-dialog>
</template>

<style lang="sass">
@import './ChassroomDialog.scss';
</style>

<script>
import VMClassroom from '@business/vmodels/classroom-local.js';

export default _extend({
  name: 'ChassroomDialog',
  data () {
    return {
      isEdit: false,
      form: {
        name: '',
        master: '',
        students: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入教室名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        master: [
          { required: true, message: '请输入班主任姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        students: [
          { type: 'number', required: true, message: '请输入学生数量, 数字', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {
    dialogInfo () {
      return this.$store.state.dialog.dialogInfo;
    }
  },
  methods: {
    confirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            VMClassroom.update(this.dialogInfo.dialogProps.id, this.form).then(() => {
              this.$mxDialog.hide();
            });
          } else {
            VMClassroom.create(this.form).then(() => {
              this.$mxDialog.hide();
            });
          }
        }
      });
    },
    close () {
      this.$mxDialog.close();
    }
  },
  mounted() {
    if (this.dialogInfo && this.dialogInfo.dialogProps && this.dialogInfo.dialogProps.id) {
      this.isEdit = true;
      this.form = Object.assign({}, this.dialogInfo.dialogProps);
    }
  }
});
</script>
