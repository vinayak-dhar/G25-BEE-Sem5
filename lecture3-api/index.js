const express = require('express');
const app = express();
const PORT = 4000;

// they will always run -> when the req is send
app.use(express.json());

app.use((req,res,next) => {
    console.log("generic middleware 1");
    next(); // it not only call the next middleware -> it actually send the req for further processing 
})

app.get('/', (req,res) => {
    console.log(req.query);
    res.status(200).send("ok");
})
app.get('/user', (req,res) => {
    console.log(req.query);
    // console.log(req.query.name);
    // console.log(req.query.number);
    const {name,number} = req.query; // object destructuring
    console.log(name,number);
    res.status(200).send("ok");
})

app.get('/user/:id/:name',(req, res) => {
    // we will recieve string in backend
    console.log(req.params);
    const {id, name} = req.params;
    console.log(id, name);
    res.send('ok');
})

app.listen(PORT, () => {
    console.log(`server live on ${PORT}`);
})


// destructuring in array
// const [num1, num2] = [1,2,3,4,5,6]
// num1 = 1 
// num2 = 2 

// params 
// way of sending the data from frontend to backend 

// middleware: its use to check the required details in the api request from the frontend annd also if we have to manipulate request we use middleware
// - generic middleware -> runs for every request ( app.use(express.json()) )