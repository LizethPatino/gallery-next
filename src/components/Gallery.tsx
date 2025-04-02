"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import GalleryGrid from "./GalleryGrid";


export default function Gallery() {
  const images = useImageStore((state) => state.images);
  const { fetchImages, query, currentPage } = useImageStore();


  useEffect(() => {
    fetchImages();
  }, [query, currentPage]);

  
  return (
    <div className="mx-auto px-2 max-w-full">
    {images.length > 0 ? (
        <GalleryGrid images={images}/>
    ) : (
      <p className="flex justify-center items-center h-[50vh] text-gray-500 text-2xl">
        No results found. Try a different search!
      </p>
    )}
  </div>
  );
}
