import { create } from "zustand";
import { ImageStore } from "@/types";
import { getUnsplashImages } from "@/lib/unsplashService";


export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "date",
  currentPage: 1,
  imagesPerPage: 15,
  favorites: [],

  toggleFavorite: (image) => {
    const { favorites } = get();
    const isFavorite = favorites.some((fav)=> fav.id === image.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== image.id);
    } else {
      updatedFavorites = [...favorites, image]
    }

    set({favorites: updatedFavorites});
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  },

  loadFavorites: () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    set({ favorites: storedFavorites });
  },
  
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
      sortedImages = sortedImages.sort((a, b) => b.likes - a.likes);
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
  },
  
  prevPage: () => {
    set((state) => {
      const prevPage = state.currentPage > 1 ? state.currentPage - 1 : 1;
      return { currentPage: prevPage };
    });
  },
  
}));
