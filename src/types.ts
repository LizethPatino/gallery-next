export interface ImageType {
    id: string;
    urls: { small: string};
    alt_description: string;
}

export interface GalleryProps {
    images: ImageType[];
}