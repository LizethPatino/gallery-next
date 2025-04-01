import Image from "next/image";
import { useImageStore } from "@/store/useImageStore";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { ImageType } from "@/types";
import { addFavorite } from "@/lib/favoritesService";
import { useSession } from "next-auth/react";

export default function GalleryItem({ img }: { img: ImageType}) {
  const favorites = useImageStore((state) => state.favorites);
  const toggleFavorite = useImageStore((state) => state.toggleFavorite);

  const { data: session } = useSession();
  const isFavorite = favorites.some((fav) => fav.id === img.id);


  const handleAddFavorite = async () => {

    if (!session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    const { id, urls, alt_description } = img;

    try {
      const userId = session.user.id; // Aquí obtienes el userId
      const data = await addFavorite(userId, id, urls.small, alt_description);
      console.log("Favorite added:", data);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };


  return (
    <div className="relative group">
      <Image
        src={img.urls.small}
        alt={img.alt_description || "Image"}
        width={300}
        height={200}
        className="rounded-lg shadow-md hover:scale-105 transition-transform"
      />
      <button
        onClick={handleAddFavorite}
        className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
      >
        {isFavorite ? (
          <HeartIcon className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutline className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
