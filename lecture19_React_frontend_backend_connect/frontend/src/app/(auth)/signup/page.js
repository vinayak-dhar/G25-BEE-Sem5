"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

const Page = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        let payload = {
            name,
            email,
            password
        }
        let res = await axios.post("http://localhost:4000/auth/signup",payload);
        if (res.status = 201) {
            router.push("/login");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign up</h1>
                
                <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                    onChange={(e) => setName(e.target.value)} 
                    id="name" 
                    placeholder="Name" 
                    type="text" 
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" 
                    placeholder="Email" 
                    type="email" 
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                    />
                </div>

                <div>
                    <label htmlFor="pass" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="pass" 
                    placeholder="Password" 
                    type="password" 
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                    Register
                </button>
                </form>
            </div>
        </div>

    )
}

export default Page;