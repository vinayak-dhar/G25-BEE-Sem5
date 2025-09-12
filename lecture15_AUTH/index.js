const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const cors = require('cors');

// app.use(cors()); // or
app.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


// routes
app.use('/auth',authRouter);
app.use('/user',userRouter);

app.get('/', (req,res) => {

})





connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server running live http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})