
export interface ImageType {
    imageId: string;
    imageUrl: string;
    description: string;
    id: string;
    urls: { small: string};
    alt_description: string;
    likes:number;
    created_at:string;
}

export interface ImageStore {
  images: ImageType[];
  query: string;
  selectedOption: "date" | "likes";
  currentPage: number;
  imagesPerPage: number;
  favorites: ImageType[];

  setCurrentPage: (page: number) => void;
  setQuery: (query: string) => void;
  fetchImages: (query?: string, page?: number, perPage?: number) => Promise<void>;
  sortImages: (option: "date" | "likes") => void;
  nextPage: () => void;
  prevPage: () => void;
  toggleFavorite: (image: ImageType, userId: string) => Promise<void>;
  loadFavorites: (userId:string) => void;
}
