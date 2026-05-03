const store = require('../storage/file.store'); // 🔁 swap here
var moment = require("moment");

module.exports = {
  createTodo(data) {

    data.id = data.lastRecordId+1;
    data.due_date = moment(data.due_date).format('YYYY/MM/DD');
    data.status = 'pending'
    data.created_at = moment().format('YYYY/MM/DD H:m:s');
    
    delete data.lastRecordId
    
    return store.create(data);
  },

  getLastTodo() {
    return store.getLastRecord();
  },

  getTodos() {
    return store.findAll();
  },

  getTodo(id) {
    return store.findById(id);
  },

  updateTodo(id, data) {
    return store.update(id, data);
  },

  deleteTodo(id) {
    return store.delete(id);
  }
};
