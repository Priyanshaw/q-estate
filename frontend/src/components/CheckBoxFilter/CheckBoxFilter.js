import React from "react";

export default function CheckBoxFilter({
  priceRangeFilter,
  locationFilter,
  handlePriceFilterChange,
  handleLocationFilterChange,
}) {
  const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
  const prices = ["0-300000", "300001-600000", "600001-1000000"];

  return (
    <div className="checkbox-filter-container">
      {/* location filter */}
      <div className="filter">
        <h2>Location</h2>
        {locations.map((location, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={locationFilter.includes(location)} // returns true or based on value if it is present or not 
              value={location}
              onChange={handleLocationFilterChange}
            />
            <label>{location}</label>
          </div>
        ))}
      </div>
      {/* price range filter */}
      <div className="filter">
        <h2>Price Range</h2>
        {prices.map((price, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={priceRangeFilter.includes(price)} // returns true or based on value if it is present or not here it will only be checked if the array of priceRange filter consist of prices in array
              value={price}
              onChange={handlePriceFilterChange}
            />
            <label>{price}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
