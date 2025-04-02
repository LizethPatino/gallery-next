export async function addFavorite(userId: string, imageId: string, imageUrl: string, description?: string) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, imageId, imageUrl, description }),
    });
  
    return res.json();
  }

  export async function getFavorites(userId: string) {
    try {
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to get favorite images");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  }
  
  