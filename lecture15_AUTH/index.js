const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth.routes');
// const userRouter = require('./routes/user.routes');


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/auth',authRouter);

app.get('/', (req,res) => {

})





connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server running live http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})