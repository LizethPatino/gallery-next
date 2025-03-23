"use client";

import { useEffect } from "react";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { useImageStore } from "@/lib/useImageStore";

export default function Home() {
  const { fetchImages } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="w-full">
      <SortOptions />
      <SearchBar />
      <div className="mt-8">
        <Gallery />
      </div>
    </div>
  );
}
