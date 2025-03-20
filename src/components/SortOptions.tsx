import { ImageType } from "@/types";

export interface SortOptionsProps {
    imagesList: ImageType[];
    onSort: (sortedList: ImageType[]) => void;
}


export default function SortOptions ({ imagesList, onSort }: SortOptionsProps) {

 
    const orderByLikes = () =>{
       console.log('imagesList', imagesList.map(image=>image.likes && image.alt_description));
       const sorted = imagesList.slice().sort((a, b) => a.likes - b.likes);
       onSort(sorted);
    }

    return(
        <button onClick={orderByLikes}>Ordenar</button>
    );
}