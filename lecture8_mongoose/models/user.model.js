const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // creating schema without any restriction 
    // name: String,
    // email: String,

    // creating schema giving restriction to the attributes 
    name: {
        type: String,
        maxLength: 16,
        required: true // make this attribute mandatory
    },
    email: {
        type: String,
        unique: true, // with this only one email can be used only one time
        required: true
    },
    age: { // it will be an optional attribute
        type: Number,
        min: 1
    }
})

// creating a collection name -> "User" and store this schema in User variable
// in mongoose this will convert the singular to prular
// that is collection name is User -> in mogoDB -> it will converted to Users
const User = mongoose.model("User",userSchema); // model -> creates collection 
module.exports = User;