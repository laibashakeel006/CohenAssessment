const service = require('../services/todo.service');

exports.create = async (req, res) => {
  try {
    
    var lastRecord = await service.getLastTodo();
    req.body.lastRecordId = lastRecord.id;

    if(req.body.title == lastRecord.title){
      return res.status(500).json({ message: "Title should be unique" })
    }

    const todo = await service.createTodo(req.body);
    res.status(201).json({ message: "Todo list created", data: todo});
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching todos" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const todo = await service.getTodos();
    res.status(200).json(todo); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching todos" });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const todo = await service.deleteTodo(req.body.id);
    res.status(200).json({ message: "Todo list deleted" }); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching todos" });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await service.getTodo(req.body.id);
    res.status(200).json(todo); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching todos" });
  }
};
