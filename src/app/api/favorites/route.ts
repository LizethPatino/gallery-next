import { NextResponse } from "next/server"
import  prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId, imageId, imageUrl, description } = await req.json();

        const favorite = await prisma.favorite.create({
            data: { userId, imageId, imageUrl, description },
        });

        return NextResponse.json(favorite,{status: 201});
    } catch (error) {
        console.error("Error saving favorite:", error);
        return NextResponse.json({ error: "Failed to save favorite" }, { status: 500 });  
    }
}

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");
  
      if (!userId) {
        return NextResponse.json(
          { error: "userId is required" },
          { status: 400 }
        );
      }
  
      const favorites = await prisma.favorite.findMany({
        where: { userId: String(userId) },
      });
  
      return NextResponse.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return NextResponse.json(
        { error: "Failed to fetch favorites" },
        { status: 500 }
      );
    }
  }