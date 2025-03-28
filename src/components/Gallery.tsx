"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function Gallery() {
  const images = useImageStore((state) => state.images);
  const favorites = useImageStore((state) => state.favorites);
  const toggleFavorite = useImageStore((state) => state.toggleFavorite);
  const { fetchImages, query, currentPage } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, [query, currentPage]);


  return (
    <div className="mx-auto px-2 max-w-full">
    {images.length > 0 ? (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-6">
          {images.map((img) => {
            const isFavorite = favorites.some((fav) => fav.id === img.id);

            return (
              <div key={img.id} className="relative group">
                <Image
                  src={img.urls.small}
                  alt={img.alt_description || "Image"}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => toggleFavorite(img)}
                   className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                >
                  {isFavorite ? (
                    <HeartIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartOutline className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            );
          })}
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
