"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { signOut, useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { data: session, status } = useSession();  // Acceder a la sesión
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  if (status === "loading") {
    return <div>Loading...</div>;  // Mostrar un loading mientras se obtiene la sesión
  }

  if (!session) {
    return (
      <div>
        <h1>No estás autenticado</h1>
        {/* Muestra el botón de login si no hay sesión */}
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="w-full px-2 max-w-7xl mx-auto">
      <SearchBar />
      <div className="mt-4 flex flex-col">
        <div className="self-end mb-4">
          <SortOptions />
        </div>
        <div className="flex-1 w-full">
          <Gallery />
        </div>
      </div>
       {/* Agregar un botón para cerrar sesión */}
       <h2>info usuario:</h2>
       <p>{session.user?.name}</p>
       <p>{session.user?.email}</p>
       <button onClick={() => signOut()} className="p-2 mt-4 bg-red-500 text-white rounded">
        Cerrar sesión
      </button>
    </div>
  );
}
