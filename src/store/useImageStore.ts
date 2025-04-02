import { create } from "zustand";
import { ImageStore, ImageType } from "@/types/ImageTypes";
import { getUnsplashImages } from "@/lib/unsplashService";
import { addFavorite } from "@/lib/favoritesService";

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "date",
  currentPage: 1,
  imagesPerPage: 15,
  favorites: [],

  toggleFavorite: async (image: ImageType, userId:string) => {
    const { favorites } = get();
    const isFavorite = favorites.some((fav)=> fav.id === image.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== image.id);
    } else {
      updatedFavorites = [...favorites, image]
    }

    set({favorites: updatedFavorites});

     const { id, urls, alt_description } = image;
    
     try {
      if (isFavorite) {
        // Si se está eliminando el favorito de la base de datos
       // const data = await removeFavorite(userId, id);
        console.log("Favorite removed:", data);
      } else {
        const data = await addFavorite(userId, id, urls.small, alt_description);
        console.log("Favorite added:", data);
      }
    } catch (error) {
      console.error("Error with favorite operation:", error);
      set({ favorites: favorites });
    }

  },

  loadFavorites: async (userId:string) => {
    try {
         //const storedFavorites = await getFavorites(userId); 
         //set({ favorites: storedFavorites });
    } catch (error) {
         console.error("Error loading favorites:", error);
    }

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
