import { Dispatch, SetStateAction } from "react";

export interface ImageType {
    id: string;
    urls: { small: string};
    alt_description: string;
}

export interface GalleryProps {
    images: ImageType[];
}

export interface SearchBarProps {
    query:string;
    setQuery:Dispatch<SetStateAction<string>>;
    onSearch: () => void;
} 