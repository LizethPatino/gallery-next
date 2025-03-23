import { create } from "zustand";
import { ImageType } from "@/types";
import { getUnsplashImages } from "@/lib/unsplashService";

interface ImageStore {
  images: ImageType[];
  query: string;
  selectedOption: "color" | "likes";

  setQuery: (query: string) => void;
  fetchImages: (query?: string) => Promise<void>;
  sortImages: (option: "color" | "likes") => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "color",

  setQuery: (query) => set({ query }),

  fetchImages: async (query = get().query || "lobos") => {  
    const images = await getUnsplashImages(query);
    set({ images });
  },

  sortImages: (option) => {
    const sortedImages = [...get().images];

    if (option === "likes") {
      sortedImages.sort((a, b) => a.likes - b.likes);
    } else {
      console.log("Ordenando por color... (pendiente de implementación)");
    }

    set({ images: sortedImages, selectedOption: option });
  },
}));
