const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const path = require('path');
const verifyUser = require('./middleware/verify.middleware');

// cookie-parser
const cookieParser = require("cookie-parser");


app.use(cookieParser());


app.use(express.json()); // it is used to store the json data in req.body
app.use(express.urlencoded({ extended:true })); // it is used to store the form data in req.body


// to run ejs files in the application
app.set("view engine","ejs"); // -> this will provide SSR
app.set('views',path.join(__dirname,"views"));


app.get('/',verifyUser, (req,res) => {
    const name = "hello world";
    const contacts = [ {name:"Contact 1",phone:1234567890}, {name:"Contact 2",phone:876543210} ]
    res.render("index",{ username:name, contacts });
    // res.render("index",{ username:name, contacts:contacts }); -> both are same
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




// ejs tags:-
// <% 'Scriptlet' tag, for control-flow, no output
// <%_ 'whitespace slurping' Scriptlet tag, strips all whitespaces before it
// <%= outputs the value into the template(HTML escaped)
// <%- outputs the unescaped value into the template
// <%# comment tag, no execution 