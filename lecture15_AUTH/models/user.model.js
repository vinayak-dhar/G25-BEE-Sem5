const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true // it will check wether the email is already present in the database or not
    },
    password: {
        type: String,
        required:true,
        select:false // this field will not be available in user data when we extract a user from DB
    }
}, {
    timestamps:true // created at and updated at field will be included
});

const User = mongoose.model("User",userSchema);
module.exports = User;