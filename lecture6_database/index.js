const express = require('express')
const app = express();
const PORT = 5000;
const {MongoClient} = require('mongodb');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


require("dotenv").config(); // without this package the variable -> DB_URi cannot be accessed it will show undifined

const client = new MongoClient(process.env.DB_URi);

// default all the files in js works synchronously
// but we can create methods or function in them that works asynchronously 
// we need to connect to the DB asynchronously -> so that it can remain connected no need to restart the connection btw DB
async function connectDB() { // it will be call inside app.listen()
    await client.connect();
    const db = client.db("G25"); // interface name
    const userCollection = db.collection("users"); // creating a database and asigning a database name
    return 'done';
}


app.get('/',(req,res) => {

})

app.listen(PORT,() => {
    // we can use it as a promises
    connectDB()
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    });
    console.log(`server live on ${PORT}`);
})