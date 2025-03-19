export async function getUnsplashImages(query: string) {
  try {
    const response = await fetch(`/api/unsplash?query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch images");
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
