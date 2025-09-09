"use client"

import Navbar from "@/components/Navbar";
import { useState } from "react";


const About = () => {

    const [count,setCount] = useState(0);

    function incrementfunc() {
        setCount(count+1);
        // setCount((prev) => prev + 1); // -> in this method we are update the previous value 
    }
    function decrementfunc() {
        setCount(count-1);
    }
    function resetCount() {
        setCount(0);
    }
    return(<>
        <Navbar setter={setCount}/>
        <h1>About page</h1>
        <h2 className="text-4xl text-center">{count}</h2>
        <div>
            <button onClick={(e) => {incrementfunc()}}>Incriment</button>
        </div>
        <div>
            <button onClick={(e) => {decrementfunc()}}>Decrement</button>
        </div>
        <div>
            <button onClick={(e) => {resetCount()}}>reset</button>
        </div>
    </>)
}

export default About;