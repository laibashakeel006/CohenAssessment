let todos = [];

module.exports = {
  create(todo) {
    todos.push(todo);
    return todo;
  },

  findAll() {
    return todos;
  },

  findById(id) {
    return todos.find(u => u.id === id);
  },

  update(id, data) {
    let index = todos.findIndex(u => u.id === id);
    if (index !== -1) todos[index] = { ...todos[index], ...data };
    return todos[index];
  },

  delete(id) {
    todos = todos.filter(u => u.id !== id);
  }
};
