import React, { useState } from "react";

function Counter({ username }) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      margin: "50px auto",
      padding: "20px",
      border: "2px solid #4A5568",
      borderRadius: "10px",
      maxWidth: "300px",
      backgroundColor: "#F7FAFC",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
      color: "#2D3748",
    },
    subheading: {
      color: "#4A5568",
      marginBottom: "20px",
    },
    count: {
      fontSize: "2rem",
      margin: "20px 0",
      color: "#2B6CB0",
    },
    button: {
      padding: "10px 15px",
      margin: "0 5px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
    incButton: {
      backgroundColor: "#38A169",
      color: "#fff",
    },
    decButton: {
      backgroundColor: "#E53E3E",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Counter App</h1>
      <h2 style={styles.subheading}>Welcome, {username}!</h2>
      <h3 style={styles.count}>{count}</h3>
      <button
        style={{ ...styles.button, ...styles.incButton }}
        onClick={increment}
      >
        Increment
      </button>
      <button
        style={{ ...styles.button, ...styles.decButton }}
        onClick={decrement}
      >
        Decrement
      </button>
    </div>
  );
}

export default Counter;
