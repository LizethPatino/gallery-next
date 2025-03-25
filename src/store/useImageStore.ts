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

  setQuery: (query) => set({ query: query, currentPage: 1 }),

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  fetchImages: async (query = get().query, page = get().currentPage, perPage = get().imagesPerPage) => {  
    const searchQuery = query && query.trim() !== "" ? query : "perros";
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
    set((state) => {
      const nextPage = state.currentPage + 1;
      return { currentPage: nextPage };
    });
  
    // Llamar fetchImages en un `useEffect` en el componente en lugar de aquí
  },
  
  prevPage: () => {
    set((state) => {
      const prevPage = state.currentPage > 1 ? state.currentPage - 1 : 1;
      return { currentPage: prevPage };
    });
  
    // Llamar fetchImages en un `useEffect` en el componente en lugar de aquí
  },
}));
