const service = require('../services/task.service');

exports.create = async (req, res) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json({ message: "Task created", data: task });
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating task" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const task = await service.getTask();
    console.error(task);

    res.status(200).json(task); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const task = await service.deleteTask(req.body.id, req.body.taskId);
    res.status(200).json({ message: "Task list deleted" }); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await service.getTask(req.body.id);
    res.status(200).json(task); // ✅ SEND RESPONSE
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching tasks" });
  }
};
