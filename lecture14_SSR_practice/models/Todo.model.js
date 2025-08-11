const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, 
{
    // give two attributes i.e. -> createdAt and updatedAt
    timestamps:true
})

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;