"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";
import Pagination from "./Pagination";

export default function Gallery() {
  const images = useImageStore((state) => state.images);
  const { fetchImages, query, currentPage } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, [query, currentPage]);

  return (
    <div className="mx-auto px-2 max-w-full">
      {images.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-6">
            {images.map((img) => (
              <Image
                key={img.id}
                src={img.urls.small}
                alt={img.alt_description || "Image"}
                width={300}
                height={200}
                className="rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-8">
            <Pagination />
          </div>
        </>
      ) : (
        <p className="flex justify-center items-center h-[50vh] text-gray-500 text-2xl">
          No results found. Try a different search!
        </p>
      )}
    </div>
  );
}
