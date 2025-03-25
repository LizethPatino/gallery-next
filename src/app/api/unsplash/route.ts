import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "cats";
  const perPage = searchParams.get("per_page") || 15;
  const page = searchParams.get("page") || 1;

  try {
    const res = await fetch(
      `${process.env.UNSPLASH_API_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch images");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
