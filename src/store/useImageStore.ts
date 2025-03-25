import { create } from "zustand";
import { ImageType } from "@/types";
import { getUnsplashImages } from "@/lib/unsplashService";

interface ImageStore {
  images: ImageType[];
  query: string;
  selectedOption: "date" | "likes";
  currentPage: number;
  imagesPerPage: number;
  
  setCurrentPage: (page: number) => void;
  setQuery: (query: string) => void;
  fetchImages: (query?: string, page?: number, perPage?: number) => Promise<void>;
  sortImages: (option: "date" | "likes") => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "date",
  currentPage: 1, // Página actual
  imagesPerPage: 15, // Número de imágenes por página

  setQuery: (query) => set({ query }),

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  fetchImages: async (query = get().query, page = get().currentPage, perPage = get().imagesPerPage) => {  
    const searchQuery = query && query.trim() !== "" ? query : "perros"; // Asegurar que no sea vacío
    const response = await getUnsplashImages(searchQuery, page, perPage);
    set({ images: response.results || [] });
  },
  
  sortImages: (option) => {
    let sortedImages = [...get().images];

    if (option === "likes") {
      sortedImages = sortedImages.sort((a, b) => a.likes - b.likes);
    } else if (option === "date") {
      sortedImages = sortedImages.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    
    set({ images: sortedImages, selectedOption: option });
  },

  nextPage: () => {
    const nextPage = get().currentPage + 1;
    set({ currentPage: nextPage });
    get().fetchImages(get().query, nextPage, get().imagesPerPage);
  },

  prevPage: () => {
    const prevPage = get().currentPage > 1 ? get().currentPage - 1 : 1;
    set({ currentPage: prevPage });
    get().fetchImages(get().query, prevPage, get().imagesPerPage);
  },
}));
