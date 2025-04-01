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