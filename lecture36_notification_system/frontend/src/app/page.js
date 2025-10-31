"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket,setSocket] = useState(null);

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    </div>
  );
}
