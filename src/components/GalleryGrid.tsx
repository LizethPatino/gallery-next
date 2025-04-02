import { ImageType } from "@/types/ImageTypes";
import GalleryItem from "./GalleryItem";

export default function GalleryGrid({ images }: { images: ImageType[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-6">
      {images.map((img) => (
        <GalleryItem key={img.id} img={img} />
      ))}
    </div>
  );
}
