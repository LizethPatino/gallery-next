export async function addFavorite(userId: string, imageId: string, imageUrl: string, description?: string) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, imageId, imageUrl, description }),
    });
  
    return res.json();
  }
  