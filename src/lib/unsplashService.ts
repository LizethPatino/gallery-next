export async function getUnsplashImages(query: string) {
  try {
    const response = await fetch(`/api/unsplash?query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch images");

    const data = await response.json();
    return data; // 🔹 Retornamos el objeto completo (con `results`)
  } catch (error) {
    console.error("Error fetching images:", error);
    return { results: [] }; // 🔹 Aseguramos que `results` siempre exista
  }
}
