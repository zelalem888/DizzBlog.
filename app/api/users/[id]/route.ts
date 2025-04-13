import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: any
) {
  
  try {
    const awaitedParams = await params

    const user = await prisma.user.findUnique({
      where: {
         email : awaitedParams.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    const getOneBlog = user?.id

    const Vlog = await prisma.vlog.findMany({
      where:{
        authorId : getOneBlog
      }
    })
    if(!Vlog)
      return NextResponse.json({error: "Can not find the specific vlog"},{status : 400})

    const response = {user, Vlog}

    // Return the user data
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: params },
      { status: 500 }
    );
  }
}