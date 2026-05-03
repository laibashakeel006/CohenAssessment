const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

const validate = require('../middlewares/validate');
const { createTaskRules, deleteTaskRules } = require('../validations/task.validation');

router.post('/', controller.getTask);
router.post('/create-task', validate(createTaskRules), controller.create);
router.delete('/', validate(deleteTaskRules), controller.deleteList);

module.exports = router;
