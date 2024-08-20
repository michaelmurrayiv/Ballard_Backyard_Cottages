import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({address: query})
      });
      console.log("here2");

      const data = await response.json();
      console.log("here3");
      console.log("Script Output:", data.output);
      console.error("Script Error:", data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    const parcel_viewer = `https://gismaps.kingcounty.gov/parcelviewer2/`;
    const address = query
    const encoded_address = address.replace(" ", "+");
    const google_maps = `https://www.google.com/maps/search/?api=1&query=${encoded_address}`;
    const parcel_number = 1;
    const property_detail = `https://blue.kingcounty.com/Assessor/eRealProperty/Detail.aspx?ParcelNbr=${parcel_number}`;
    
    window.open(parcel_viewer, "_blank");
    window.open(google_maps, "_blank");
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
