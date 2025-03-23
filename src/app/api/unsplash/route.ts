import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "cats";

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch images");

    const data = await res.json();
    return NextResponse.json(data); // 🔹 Devuelve solo 5 imágenes
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
