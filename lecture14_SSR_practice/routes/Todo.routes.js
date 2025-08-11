const express = require('express');
const Todo = require('../models/Todo.model');
const { createTodo, deleteTodo, updateTodoStatus, searchTodo, allTodo } = require('../controllers/todo.controller');
const router = express.Router();

router.post('/create',createTodo);

router.delete('/delete/:id',deleteTodo);

router.put('/updateStatus/:id', updateTodoStatus);

router.get('/search', searchTodo);

router.get('/all', allTodo);

// query params 
// one API cannot send 2 response therefore we used return statement in the if statement
router.get('/filter', async(req,res) => {
    try {
        const { filterName } = req.query; // client is sending both key and a value
        if (!filterName) {
            throw new Error("filterName is required"); // this is self generated error if there is a error then the if will not access the try block anymore and therefore the app will not crash
        }
        // filterName -> all, active, completed
        // all -> return all todos
        // active -> return todos where status is false
        // completed -> return todos where status is true
        if (filterName == "all") {
            const todos = await Todo.find();
            return res.status(200).json({ todos });
        }
        const todos = await Todo.find({ status: filterName == "active" ? false : true });
        res.status(200).json({ todos });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
})

// bulk delete of all the completed task
router.delete('/clear/completed',async(req,res) => {
    try {
        await Todo.deleteMany({ status: true });
        res.status(200).json({ message: "todos deleted" });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;