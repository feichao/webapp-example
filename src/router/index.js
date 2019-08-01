import Vue from 'vue';
import Router from 'vue-router';

/**
 * 相同业务单元的组件放到同一个异步模块中
 * 使用 \/* webpackChunkName: "classroom" *\/ 实现
 */
const Classroom = () => import(/* webpackChunkName: "classroom" */ '../business/views/Classroom/Classroom.vue');
// const AddClassroom = () => import(/* webpackChunkName: "classroom" */ '../business/views/Classroom/AddClassroom/AddClassroom.vue');
// const EditClassroom = import(/* webpackChunkName: "classroom" */ '../business/views/Classroom/EditClassroom/EditClassroom.vue');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Classroom',
      component: Classroom,
      // children: [{
      //   path: '/add',
      //   name: 'AddClassroom',
      //   component: AddClassroom
      // }, {
      //   path: '/edit/:id',
      //   name: 'EditClassroom',
      //   component: EditClassroom
      // }]
    }
  ]
});

export default router;
