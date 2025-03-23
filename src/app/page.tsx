"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";

export default function Home() {
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="w-full px-2 max-w-7xl mx-auto">
      <SearchBar />
      <div className="mt-4 flex flex-col">
        <div className="self-end mb-4">
          <SortOptions />
        </div>
        <div className="flex-1 w-full">
          <Gallery />
        </div>
      </div>
    </div>
  );
}
