"use client";

import { useState } from "react";
import { useImageStore } from "@/store/useImageStore";

export default function SearchBar() {
  const { query, setQuery, fetchImages } = useImageStore();
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    setQuery(inputValue);
    fetchImages(inputValue || "cats");
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 mt-10">
      <div className="w-full max-w-lg flex items-center bg-white p-2 rounded-full shadow-lg border border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 text-lg border-none outline-none bg-transparent w-full sm:w-auto"
          placeholder="Type a keyword"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition text-sm sm:text-base"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
