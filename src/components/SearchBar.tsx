import { SearchBarProps } from "@/types";

export default function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
    return (
      <div>
        <input 
          type="text"
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  }
  