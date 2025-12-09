import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import Guess from "./components/Guess"

function App() {
  const [username] = useState("Mike");
  return (
    <>
      <div>
        <Counter username={username} />
        <Guess />
      </div>
    </>
  );
}

export default App;
