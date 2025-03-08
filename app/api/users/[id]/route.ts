import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const awaitedParams = await params
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: awaitedParams.id, // Use the id from params
      },
    });

    // If the user is not found, return a 404 error
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}