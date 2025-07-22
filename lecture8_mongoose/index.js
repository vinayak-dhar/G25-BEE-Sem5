// Mongoose -> 
// - provides connection methods
// - provides easy queries for CRUD operation
// - provide structure to the collections


// schema -> structure of collection
// - defines attribute of a collection
// - types of attribute value
// - ristriction on attribute value



const express = require('express');

// importing connectDB function from db folder in connectDB.js file
const connectDB = require('./db/connectDb'); 
const app = express();
const PORT = 4000;
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));




// using this in index.js 
// to make it modular we write the connectDB function in db folder and in connectDB.js 
// const mongoose = require('mongoose');

// async function connectDB() {
//     // connected to the cluster of the database
//     await mongoose.connect(process.env.DB_URL);
// }




// we should create the schema inside the models folder 
// and generally the naming convention of file inside the models folder is -> user.model.js
// creating a schema inside index.js
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     // creating schema without any restriction 
//     // name: String,
//     // email: String,

//     // creating schema giving restriction to the attributes 
//     name: {
//         type: String,
//         maxLength: 16,
//         required: true // make this attribute mandatory
//     },
//     email: {
//         type: String,
//         unique: true, // with this only one email can be used only one time
//         required: true
//     },
//     age: { // it will be an optional attribute
//         type: Number,
//         min: 1
//     }
// })

// // creating a collection name -> "User" and store this schema in User variable
// // in mongoose this will convert the singular to prular
// // that is collection name is User -> in mogoDB -> it will converted to Users
// const User = mongoose.model("User",userSchema); // model -> creates collection 

const User = require('./models/user.model') // -> importing User collection into this variable


app.get('/', async(req,res) => { // we create -> create data hard coded using .get()
    const user = await User.create({
        name:"user 1",
        email: "user123@gmail.com",
        age: 21
    })
    res.status(201).json({user});
});


connectDB().then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log("server running on port " + PORT);
    })
})
.catch((error) => {
    console.log(error);
})