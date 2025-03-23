"use client";

import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";

export default function Gallery() {
  
  const images = useImageStore((state) => state.images);
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 p-6">
        {images.map((img) => (
          <Image
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
