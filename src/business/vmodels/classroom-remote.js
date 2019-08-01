class ClassroomModel extends _VModelRemote {
  constructor(options) {
    super({
      url: '/api/classrooms',
      iLike: [{
        id: String,
        name: String,
      }]
    });
  }
  get() {
    return super.get('/api/classrooms', {
      // get 方法中的 iLike 优先级更高
      iLike: [{
        id: String,
        name: String,
        master: String,
        students: Number,
      }]
    });
  }
  sync() {
    return this.post({a: 1, b: 2}, {
      url: '/api/classrooms/:sync?a=1&b=:x',
      params: {
        sync: 'sync',
        x: 1,
        y: 2
      }
    });
  }
};

export default new ClassroomModel();
