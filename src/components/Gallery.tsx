"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import GalleryGrid from "./GalleryGrid";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

export default function Gallery() {
  const images = useImageStore((state) => state.images);
  const { fetchImages, query, currentPage } = useImageStore();
  const { data: session } = useSession();

  useEffect(() => {
    fetchImages();
  }, [query, currentPage]);


  return (
    <div className="mx-auto px-2 max-w-full">
            {!session ? (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-gray-600">Inicia sesión para más funciones</p>
          <LoginButton />
        </div>
      ) : (
        <button className="p-2 mt-4 bg-red-500 text-white rounded">
          Cerrar sesión
        </button>
      )}

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
