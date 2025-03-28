"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";

export default function FavoritesLoader() {
  const loadFavorites = useImageStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return null;
}
