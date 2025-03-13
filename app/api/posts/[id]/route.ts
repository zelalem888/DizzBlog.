import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";



export async function GET(
    request: NextRequest,
    { params}: any
  ) {
    try {
      // const params = { id: '6' }
      // Parse the ID from params
      const paramsId = params.id;
  
      // Fetch the vlog from the database using authorId
      const vlog = await prisma.vlog.findFirst({
        where: {
          id: parseInt(paramsId) , // Use findFirst instead of findUnique
        },
      });
  
      // If the vlog is not found, return a 404 error
      if (!vlog) {
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        );
      }
      const authorId = vlog.authorId
  
      // Fetch the user (author) associated with the vlog
      const user = await prisma.user.findUnique({
        where: {
          id: authorId,
        },
      });
  
      // If the user is not found, return a 404 error
      if (!user) {
        return NextResponse.json(
          { error: "Author not found" },
          { status: 404 }
        );
      }
  
      // Combine vlog and user data
      const response = {
        ...vlog,
        authorName: user.name, // Add the author's name to the response
      };
  
      // Return the combined data
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Failed to fetch post:", error);
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: 500 }
      );
    }
  }

  

export async function PUT(request :NextRequest,
  {params} : any
  ){

    const body = await request.json();
    const paramsId = parseInt(params.id);

    if (isNaN(paramsId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 }
      );
    }

    const getUser = await prisma.vlog.findUnique({
      where: { id: paramsId },
    });


    if(!getUser)
        return NextResponse.json({ error: "invalid request!" },{ status:400 })

    const updateUser = await prisma.vlog.update({
        where: {id : getUser.id},
        data:{
            title: body.title,
            description : body.description,
        }
    })
    return NextResponse.json(updateUser, {status : 200})  

}