const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")));



app.get('/', (req,res) => {

})


connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server is live on ${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})