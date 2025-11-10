const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
const {v4:uuid} = require('uuid');
const io = socket(server,{
    cors:{
        origin:"http://localhost:3000"
    }
});
const PORT = 5000;
const path = require("path");
const { register } = require("module");

app.use(cors({
    origin:"http://localhost:3000",
    methods:"POST,GET"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));


// {
//   username1: socketio1,
//   username2: socketio2
// }
const Users = {};
// post -> {
//  id        -> 
//  author    -> username
//  content   -> string 
//  likes     -> [username]
//  createdAt -> date
// }
let Posts = [];

io.on("connection",(client)=>{
  console.log("User 1 connected -> ",client.id);
  
  // register user 
  client.on("register",(userName) => {
    Users[userName] = client.id;
  })
});


app.post("/post/create",async(req,res) => {
  try {
    const {username,content} = req.body;
    const post = {
      id:uuid(),
      author:username,
      content,
      likes:[],
      createdAt:new Date()
    };

    Posts.unshift(post);
    io.emit("post update",Posts);
    res.status(201).json({post:Posts});
  } 
  catch(error) {
    res.status(401).json({message:error.message});
  }
});

app.post("/post/like/:id/:username",(req,res)=>{
  try {
    const {id,username} = req.params;
    // [post,post,updated post, post ,post]
    let userPost;
    Posts = Posts.map((post)=>{
      if(post.id == id ){
        if(post.likes.includes(username)){
          throw new Error("alreday liked the post");
        }
        userPost = post;
        post.likes.push(username);
      }
      return post;
    });

    // notification when some user liked the post
    if (Users[userPost.author] && username != userPost.author) {
      io.to(Users[userPost.author]).emit("notice", `${username} liked your post ${userPost.content}`);
    }
    io.emit("post update",Posts);
    res.status(200).json({message:"post updated successfully"});
  }
  catch(error) {
    res.status(401).json({message:error.message})
  }
})

app.get('/post/all',async(req,res) => {
  res.status(200).json({posts:Posts});
})

// let obj = {
//   "shubham":"jjdfasdfj"
// }
// obj["shubham"] = socketid

app.get("/", (req, res) => {
  res.send("server running");
});

server.listen(PORT, () => console.log("Server running on port " + PORT));

// tasks
// 1. update real time likes on post
// 2. update real time post
// 3. send real time notification when a user likes a post