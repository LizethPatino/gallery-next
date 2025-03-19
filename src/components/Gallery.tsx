import { GalleryProps } from "@/types";
import Image from "next/image";

export default function Gallery({images}: GalleryProps){
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((img)=>(
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
    );
}