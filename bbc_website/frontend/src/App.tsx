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
  const [output, setOutput] = useState<string>("");

  // Handle the search button click
  const handleSearch = async () => {
    const response = await fetch("http://localhost:5000/run-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    if (response.ok) {
      const data: ResponseData = await response.json();
      setOutput(data.output);
    } else {
      setOutput("Error running script");
    }
  };

  return (
    <div className="App">
      <Header className="Header" />
      <main>
        <SearchBar setInput={setInput} handleSearch={handleSearch} />
        <p>Output: {output}</p>
      </main>
    </div>
  );
}

export default App;
