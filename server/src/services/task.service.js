const store = require('../storage/file.store'); // 🔁 swap here
var moment = require("moment");

module.exports = {
  createTask(data) {
    const task = {
      description: data.description,
      due_date: moment(data.due_date).format('YYYY/MM/DD'),
      priority: data.priority,
      status: 'pending',
      created_at: moment().format('YYYY/MM/DD H:m:s'),
    };

    return store.createTask(data.id, task);
  },

  getLastTaskRecord() {
    return store.getLastTaskRecord();
  },

  getTasks() {
    return store.findAll();
  },

  getTask(id) {
    return store.findById(id);
  },

  updateTask(id, data) {
    return store.update(id, data);
  },

  deleteTask(id, data) {
    return store.deleteTask(id, data);
  },
  
  changePriority(id, data) {
    return store.changePriority(id, data);
  }
};
