const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');

const validate = require('../middlewares/validate');
const { createTodoRules, deleteTodoRules } = require('../validations/todo.validation');

router.get('/', controller.getAll);
router.post('/', validate(createTodoRules), controller.create);
router.delete('/', validate(deleteTodoRules), controller.deleteList);
router.post('/get-todo', controller.getTodo);

module.exports = router;
