import React from "react";
import "./App.css";
import Header from "./components/Header.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { useState } from "react";

// Define types for the response data from the backend
interface ResponseData {
  output: string;
}

function App() {
  const [input, setInput] = useState<string>("");

  // Handle the search button click
  const handleSearch = async () => {
    const response = await fetch("http://localhost:5000/run-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    if (response.ok) {
      console.log("Success:", response.statusText);
    } else {
      console.error("Error:", response.statusText);}
  };

  return (
    <div className="App">
      <Header className="Header" />
      <main>
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
