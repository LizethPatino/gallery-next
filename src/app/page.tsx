"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { signOut, useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { data: session, status } = useSession();
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-2">
      <SearchBar />
      <div className="mt-4 flex flex-col">
        <div className="self-end mb-4">
          <SortOptions />
        </div>
        <div className="flex-1">
          <Gallery />
        </div>
      </div>

      {!session ? (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-gray-600">Inicia sesión para más funciones</p>
          <LoginButton />
        </div>
      ) : (
        <button onClick={() => signOut()} className="p-2 mt-4 bg-red-500 text-white rounded">
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
