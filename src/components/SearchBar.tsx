"use client";

import { useState } from "react";
import { useImageStore } from "@/store/useImageStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
  const { query, setQuery, fetchImages } = useImageStore();
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = () => {
    setQuery(inputValue);
    fetchImages(inputValue || "cats");
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 mt-10">
      <div className="w-full max-w-6xl flex items-center bg-white p-2 rounded-md shadow-lg border border-gray-200 focus:ring-primary">
        <input
          type="text"
          className="flex-grow p-2 text-xl border-none outline-none bg-transparent w-full sm:w-auto"
          placeholder="Type a keyword"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition text-sm sm:text-base flex items-center gap-2"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="h-6 w-6" /> 
          Search
        </button>
      </div>
    </div>
  );
}
