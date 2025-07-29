const express = require('express');
const Todo = require('../models/Todo.model');
const { createTodo, deleteTodo, updateTodoStatus, searchTodo } = require('../controllers/todo.controller');
const router = express.Router();

router.post('/create',createTodo);

router.delete('/delete/:id',deleteTodo);

router.put('/updateStatus/:id', updateTodoStatus);

router.get('/search', searchTodo);

module.exports = router;