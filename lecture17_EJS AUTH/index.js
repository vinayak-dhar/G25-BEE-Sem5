const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const path = require('path');


app.use(express.json());
app.set(express.urlencoded({ extended:true }));


// to run ejs files in the application
app.set("view engine","ejs"); // -> this will provide SSR
app.set('views',path.join(__dirname,"views"));


app.get('/', (req,res) => {
    res.render("index");
})



// routes
app.use('/auth',authRouter);
app.use('/user',userRouter);






connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server running live http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})