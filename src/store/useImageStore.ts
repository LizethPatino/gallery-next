import { create } from "zustand";
import { ImageType } from "@/types";
import { getUnsplashImages } from "@/lib/unsplashService";

interface ImageStore {
  images: ImageType[];
  query: string;
  selectedOption: "date" | "likes";

  setQuery: (query: string) => void;
  fetchImages: (query?: string) => Promise<void>;
  sortImages: (option: "date" | "likes") => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "date",

  setQuery: (query) => set({ query }),

  fetchImages: async (query = get().query || "perros") => {  
    const response = await getUnsplashImages(query);
    const images = response.results || [];
    set({ images });
  },

  sortImages: (option) => {
    let sortedImages = [...get().images];

    if (option === "likes") {
      sortedImages = sortedImages.slice().sort((a, b) => a.likes - b.likes);
    } else if (option === "date") {
      sortedImages = sortedImages.slice().sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    
    set({ images: sortedImages, selectedOption: option });
  },
}));
