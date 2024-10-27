import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(city); // Send city to the parent component
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center h-16 mt-4"
    >
      <div className="w-full max-w-md flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Set city from input
          className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-l-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Search By City Name"
        />
        <button className="px-4 py-2 text-sm text-white bg-blue-500 border border-blue-500 rounded-r-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
