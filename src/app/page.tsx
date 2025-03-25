"use client";

import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { signOut, useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { data: session, status } = useSession();

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
    </div>
  );
}
