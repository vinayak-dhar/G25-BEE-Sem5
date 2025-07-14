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
let userCollection;
async function connectDB() { // it will be call inside app.listen()
    await client.connect();
    const db = client.db("G25"); // interface name
    userCollection = db.collection("users"); // creating a database and asigning a database name
    return 'done';
}


app.get('/',(req,res) => {
    res.send(200);
})



// posting data from the browser body to the database
// -> using insertOne command
app.post("/user",async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const result = await userCollection.insertOne({name,email,password});
        res.status(201).json({result});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

// -> using insertMany command in this users api
// -> data should be passed in array of objects in postman
// like this ->
// {
//     "users": [
//         {
//             "name": "vinayak dhar",
//             "email": "vinayak04.dhar@gmail.com",
//             "password": "HelloWorld1234!@#"
//         },
//         {
//             "name": "sparshi mheta",
//             "email": "merabetasparsh@gmail.com",
//             "password": "HelloWorld1234!@#"
//         }
//     ]
// }
app.post("/users",async(req,res) => {
    try {
        const {users} = req.body;
        const result = await userCollection.insertMany(users);
        res.status(200).json({result});
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}) 


// deleting user using delte api -> it will execute if we are using mongoose dependency
// it will not execute for mongodb dependency -> we need to import object id from the mongodb dependency
const {ObjectId} = require('mongodb');
app.delete("/users/:id",async(req,res) => {
    try {
        const {id} = req.params;
        // it will delete only one data because the data will have only one unique _id
        const result = await userCollection.deleteMany({_id:new ObjectId(id)});
        res.status(200).json({result,message:"user deleted successfully"});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
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