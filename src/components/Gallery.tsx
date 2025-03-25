"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";


export default function Gallery() {
  const images = useImageStore((state) => state.images);
  const nextPage = useImageStore((state) => state.nextPage);
  const prevPage = useImageStore((state) => state.prevPage);

  const { fetchImages, query, currentPage } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, [query, currentPage]); // Solo se ejecuta cuando cambia la query o la página
  
  return (
    <div className="mx-auto px-2 max-w-full">
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

      <div className="flex justify-center mt-6">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mx-2 bg-primary rounded disabled:opacity-50 text-white  hover:bg-primary-dark">
          Before
        </button>
        <span className="px-4 py-2 mx-2">Page {currentPage}</span>
        <button onClick={nextPage} className="px-4 py-2 mx-2 bg-primary rounded hover:bg-primary-dark text-white">
          Next
        </button>
      </div>
    </div>
  );
}
