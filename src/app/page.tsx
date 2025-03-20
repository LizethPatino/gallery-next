"use client";

import { useEffect, useState } from "react";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import { getUnsplashImages } from "@/lib/unsplashService";
import { ImageType } from "@/types";
import SortOptions from "@/components/SortOptions";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    async function fetchInitialImages() {
      const initialImages = await getUnsplashImages("lobos");
      setImages(initialImages);
    }
    fetchInitialImages();
  }, []);

  const handleSearch = async () => {
    const newImages = await getUnsplashImages(query || "cats");
    setImages(newImages);
  };

  const handleSort = (sortedList: ImageType[]) => {
    setImages([...sortedList]); 
};

  return (
    <div className="w-full">
      <SortOptions imagesList={images} onSort={handleSort}/>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="mt-8">
        <Gallery images={images} />
      </div>
    </div>
  );
}
