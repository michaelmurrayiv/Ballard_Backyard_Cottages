import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState<string>("");

  // Type the event parameter for the change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleClick = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: query }),
      });

      const data = await response.json();
      console.log("Script Output:", data.output);
      console.error("Script Error:", data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchBar;
