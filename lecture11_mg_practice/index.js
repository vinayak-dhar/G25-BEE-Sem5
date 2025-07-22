const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let Task = require('./models/Todo.model');

const router = require('./routes/Todo.routes');



connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server is live on ${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})