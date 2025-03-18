import { GalleryProps } from "@/types";
import Image from "next/image";

export default function Gallery({images}: GalleryProps){
    return(
        <div>
        {images.map((img)=>(
            <Image
                key={img.id}
                src={img.urls.small}
                alt={img.alt_description}
                width={300} 
                height={200} 
            />
        ))}
        </div>
    );
}