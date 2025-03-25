"use client";

import { useImageStore } from "@/store/useImageStore";

export default function Pagination() {
  const nextPage = useImageStore((state) => state.nextPage);
  const prevPage = useImageStore((state) => state.prevPage);
  const { currentPage } = useImageStore();

  return (
    <div className="flex justify-center mt-6">
      { currentPage > 1 &&
      <button
        onClick={prevPage}
        className="px-4 py-2 mx-2 bg-primary rounded text-white  hover:bg-primary-dark"
      >
        Before
      </button>
        }
      <span className="px-4 py-2 mx-2">Page {currentPage}</span>
      <button
        onClick={nextPage}
        className="px-4 py-2 mx-2 bg-primary rounded hover:bg-primary-dark text-white"
      >
        Next
      </button>
    </div>
  );
}
