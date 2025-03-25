"use client";

import { useImageStore } from "@/store/useImageStore";

export default function SortOptions() {
  const { selectedOption, sortImages } = useImageStore();

  return (
    <div className="flex items-center gap-2 p-2">
      <span className="text-gray-700 font-medium">Order By:</span>
      <select
        value={selectedOption}
        onChange={(e) => sortImages(e.target.value as "date" | "likes")}
        className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="likes">Most Likes</option>
        <option value="date">Most Recent</option>
      </select>
    </div>
  );
}
