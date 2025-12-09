import React, {useState} from "react";

function Counter(){
    const [count,setCount]=useState(0);
    const [username,setUsername]=useState("Mike");
    function increment(){
        setCount(count+1);
    }
    function decrement(){
        setCount(count-1);
    }
    return (
        <div>
            <h1>Counter App</h1>
            <h2>Welcome,{username}</h2>
            <h3>{count}</h3>
            <button onClicj ={increment}>Increment </button>
             <button onClicj ={decrement}>Decrement </button>
        </div>
    );
}

export default Counter
