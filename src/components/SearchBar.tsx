import { SearchBarProps } from "@/types";

export default function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Search for Images
      </h1>

      <div className="w-full max-w-lg flex items-center bg-white p-2 rounded-full shadow-lg border border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 text-lg border-none outline-none bg-transparent w-full sm:w-auto"
          placeholder="Type a keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition text-sm sm:text-base"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
