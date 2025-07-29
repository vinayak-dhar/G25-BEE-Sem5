const Todo = require('../models/Todo.model');

const createTodo = async(req,res) => {
    try {
        const { task } = req.body;
        const todo = new Todo.create({
            task:task
        });
        res.status(201).json({ todo,message:"todo created successfully" });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
}

const deleteTodo = async(req,res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message:"todo deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message:error.message })
    }
}

const updateTodoStatus = async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        todo.status = !todo.status;
        await todo.save();
        res.status(200).json({ message:"todo status updated successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchTodo = async(req,res) => {
    try {
        // querry -> it is something that both the key and values are send by the client
        const { task } = req.query;
        const matchedTodos = await Todo.find({ task:{ $regex:task, $options:"i" } }); // -> $options represent the case sensitivity -> i -> works for all cases
        res.status(200).json({ todo:matchedTodos});
    }
    catch (error) {
        res.status(500).json({ message:error.message });
    }
}
module.exports = { createTodo, deleteTodo, updateTodoStatus, searchTodo };