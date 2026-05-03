const fs = require('fs');
const path = './data/Todo.json';

function read() {
  return JSON.parse(fs.readFileSync(path));
}

function write(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  create(todo) {
    let data = read();
    data.push(todo);
    write(data);
    return todo;
  },

  findAll() {
    return read();
  },
  
  // update(id, data) {
  //   let data = read();
  //   let index = data.findIndex(u => u.id === id);
  //   if (index !== -1) data[index] = { ...data[index], ...data };
  //   write(data);
  //   return data[index];
  // },

  findById(id) {
    return read().find(u => u.id == id);
  },

  getLastRecord() {
    let data = read();

    if(data.length > 0){
      const record = data[data.length - 1];
      return record;
    }
  },

  delete(id) {
    let data = read().filter(u => u.id != id);
    write(data);

    return id;
  },

  // Store task data into json

  createTask(todoId, task) {
    let data = read();
    const todo = data.find((item) => item.id == todoId);

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (!Array.isArray(todo.tasks)) {
      todo.tasks = [];
    }

    const lastTask = todo.tasks[todo.tasks.length - 1];
    task.id = lastTask ? Number(lastTask.id) + 1 : 1;

    todo.tasks.push(task);
    write(data);
    return task;
  },

  getLastTaskRecord(todoId) {
    const todo = read().find((item) => item.id == todoId);

    if (!todo || !Array.isArray(todo.tasks) || todo.tasks.length === 0) {
      return null;
    }

    return todo.tasks[todo.tasks.length - 1];
  },
  
  deleteTask(id, taskId) {

    let data = read();
    const todo = data.find((item) => item.id == taskId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    if (Array.isArray(todo.tasks)) {
      let tasks = todo.tasks.filter(u => u.id != id);
      todo.tasks = []
      todo.tasks.push(tasks);

      console.log(todo, 'iddo')

      write(todo);
    }

    
    return id;
  },
  changePriority(id, data){
    // let data = read();
    const todo = data.find((item) => item.id == data.taskId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    if (Array.isArray(todo.tasks)) {
      let index = todo.tasks.findIndex(u => u.id == id);
      // if (index != -1) data[index] = { ...data[index], ...data };
      // write(data);
      // return data[index];
    }

  }


};
