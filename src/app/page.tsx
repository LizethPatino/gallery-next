"use client";

import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import { signOut, useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import Pagination from "@/components/Pagination";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
<div className="px-2">
      <SearchBar />
      <div className="mt-4 flex flex-col">
        <div className="mb-4 self-end">
          <SortOptions />
        </div>
        <div className="w-full">
          <Gallery />
        </div>
        <div className="w-full flex justify-center mt-8 mb-8">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
