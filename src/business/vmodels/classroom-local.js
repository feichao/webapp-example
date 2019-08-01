import Constants from '@constants';

class ClassroomModel extends _VModelLocal {
  constructor(options) {
    super({
      key: Constants.GLOBAL_KEYS.STORAGE.CLASSROOM,
      iLike: [{
        id: String,
        name: String,
        master: String,
        students: Number,
      }]
    });
  }

  create(data) {
    return this.get().then(classrooms => {
      const id = classrooms.length;
      classrooms.push({
        id,
        ...data
      });
      return classrooms;
    }).then(newData => {
      return super.set(newData);
    });
  }

  update(id, data) {
    return this.get().then(classrooms => {
      const newData = classrooms.filter(c => c.id !== id);
      newData.push({
        id,
        ...data
      });
      return newData;
    }).then(newData => {
      return super.set(newData);
    });
  }

  delete(id) {
    if (!id) {
      return super.remove();
    } else {
      return this.get().then(classrooms => {
        return classrooms.filter(c => c.id !== id);
      }).then(newData => {
        return super.set(newData);
      });
    }
  }
};

export default new ClassroomModel();
