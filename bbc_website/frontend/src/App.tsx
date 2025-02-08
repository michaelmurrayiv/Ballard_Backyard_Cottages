import React from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";



function App() {
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
