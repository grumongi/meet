import React, { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // UseEffect to initialize suggestions with allLocations when it's available
  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          typeof location === "string" &&
          location.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

 const handleItemClicked = (event) => {
   const value = event.target.textContent;
   setQuery(value);
   setShowSuggestions(false);
   setCurrentCity(value);
 };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions" role="list">
  {suggestions.map((suggestion, index) => (
    <li
      role="listitem"
      onClick={handleItemClicked}
      key={`${suggestion}-${index}`}
    >
      {suggestion}
    </li>
  ))}
  <li role="listitem" key="See all cities" onClick={handleItemClicked}>
    <b>See all cities</b>
  </li>
</ul>
      )}
    </div>
  );
};

export default CitySearch;