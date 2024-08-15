import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
