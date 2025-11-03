"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [username,setUserName] = useState("");
  const [content,setContent] = useState("");


  // socket client initialise
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
  },[]);

  // client connection
  useEffect(() => {
    // use '?' for undefined handling if there is no socket then skip
    socket?.on("connect",() => {
      console.log(("user connected: ", socket.id));
    })
  },[socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("register",username);
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full bg-white text-black flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border rounded-md px-4 py-5">
          <label form="username">Username</label>
          <input onChange={(e) => setUserName(e.target.value)} className="border" id="username" placeholder="Enter Name"></input>
          <button className="border bg-blue-300 rounded-lg">Register</button>
        </form>
      </div>
    );
  }
  

  const handlePostCreate = async (e) => {
    e.preventDefault();
    let payload = {
      username,
      content
    };
    let res = await axios.post("http://localhost:5000/post/create",payload);
  }


  return (
    <div className="h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}</h1>

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md px-4 py-5">
          <label form="username">Create Tweet</label>
          <textarea rows={3} cols={7} onChange={(e) => setUserName(e.target.value)} className="border" id="username"></textarea>
          <button className="border bg-blue-300 rounded-lg">Post</button>
        </form>
    </div>
  )
}
