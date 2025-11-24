const express = require('express');
const client = require('./client');
const { all } = require('axios');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// string data type
app.get('/',async(req,res) => {
    try {
        const res1 = await client.set("users:10","test 2","nx");
        // console.log(res1); // if the keys exits it will give null

        const res2 = await client.expire("users:10",7); // this is used to make a key expire

        const data = await client.get("users:10");
        const datas = await client.mget("users:10","users:1","users:3");
        res.json({ data,datas });
    }
    catch(error) {
        console.log(error);
    }
});


// list data type -> this will add duplicate data when refreshed
app.get('/list',async(req,res) => {
    try {
        // if the list exist it will directly push the data to that list
        // if the list not exist then it will create a new list
        const res1 = await client.lpush("mylist",1);
        const res2 = await client.lpush("mylist",2);

        const data = await client.lrange("mylist",0,-1);
        res.json({ data });
    }
    catch (error) {
        console.log(error);
    }
});


// sets data type -> this is used if we dont want there to be any dupliate data when the page is refreshed
app.get('/sets',async(req,res) => {
    try {
        const res1 = await client.sadd("myset","hello",7);
        const res2 = await client.sadd("myset","hel",14);
        const res3 = await client.sadd("myset",1,21);

        const allKeys = await client.smembers("myset");
        const isExist = await client.sismember("myset","hello"); // it will give 0 if data does not exist and 1 for if the data exist in the set
        console.log(isExist);
        res.json({ allKeys, isExist });
    }
    catch(error) {
        console.log(error);
    }
})


// JSON
app.get('/json',async(req,res) => {
    try {
        const jsondata = {
            name: "vinayak",
            val:21
        }
        const res1 = await client.set("mydata:1",JSON.stringify(jsondata));

        const data = await client.get("mydata:1");
        const realData = JSON.parse(data);
        res.json({ realData });
    }
    catch(error) {
        console.log(error);
    }
})

// api architecture with redis
app.get('/arch', async(req,res) => {
    try {
        // 1. to check data in redis
        const data = await client.get("archData:1");
        if (data) {
            return res.json({ data:JSON.parse(data) });
        }

        // 2. if !data then find from DB
        // ..... fetch data from DB

        // 3. store the data from DB into redis
        const res1 = await client.set("archData:1",JSON.stringify({ name:"vinayak",val:1}));

        // 4. set an expiery on data in redis
        await client.expire("archData:1",10);

        res.json({ data:"fetched data from DB" });
    }
    catch(error) {
        console.log(error);
    }
})

app.listen(PORT,() => console.log("Server running on port " + PORT));