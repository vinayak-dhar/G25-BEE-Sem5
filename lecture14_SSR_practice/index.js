const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT;
const model = require('./models/Todo.model');

// routers
const todoRouter = require('./routes/Todo.routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")));



// routes 
app.use('/todo',todoRouter);


connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server is live on http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})




// console -> frontend errors
// network -> api integeration errors
// -> header - infromation about user and api -> path cookies jwt status
// -> payload - data send by the user
// -> preview - preview of response
// -> response - whole response of server