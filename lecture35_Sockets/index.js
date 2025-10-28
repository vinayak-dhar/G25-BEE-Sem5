const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server); // create the instance of the server
const PORT = 5000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));


// client is the reference of the user that connected to this server
io.on('connection',(client) => {
    console.log("user 1 connected -> ",client.id);

    // sending data to other clients on servers 
    client.emit("notice","this is first message");
});

app.get('/',(req,res) => {
    res.send('server running');
});

server.listen(PORT,() => {
    console.log("server running on port " + PORT);
});

// we cannot connect the socket through express so we need to connect socket through http
// app is created using express so all the api can only be used in this server
// now we are using express in http

// data -> send => emit -> client.emit("event-name",data) , data -> number,obj,string etc

// data-recieve => on -> client.on("event-name",(data) => {}) 

// broadcast.emit -> when we use more than 1 connection and to send data to all these connection we use broadcast