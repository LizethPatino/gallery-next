import Gallery from "@/components/Gallery";
import { getUnsplashImages } from "@/lib/unsplashApi";

export default async function Home() {
  const images = await getUnsplashImages();
  return (
    <div>
      <Gallery images={images}/>
    </div>
  );
}
