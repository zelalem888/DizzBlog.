import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// GET vlog data
export async function GET(request: NextRequest, { params }: any) {
  try {
    const param = await params
    const paramsId = await param.id;

    // Fetch the vlog from the database using _id (MongoDB uses string _id)
    const vlog = await prisma.vlog.findFirst({
      where: {
        id: paramsId,
      },
    });

    if (!vlog) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const authorId = vlog.authorId;

    const user = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const response = {
      ...vlog,
      authorName: user.name,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT - update vlog
export async function PUT(request: NextRequest, { params }: any) {
  const body = await request.json();
  const paramsId = params.id; // No parsing needed for MongoDB string ID

  const getUser = await prisma.vlog.findUnique({
    where: { id: paramsId },
  });

  if (!getUser) {
    return NextResponse.json({ error: "Invalid request!" }, { status: 400 });
  }

  const updateUser = await prisma.vlog.update({
    where: { id: paramsId },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updateUser, { status: 200 });
}

// DELETE vlog
export async function DELETE(request: NextRequest, { params }: any) {
  const paramsId = params.id;

  const findUser = await prisma.vlog.findFirst({
    where: {
      id: paramsId,
    },
  });

  if (!findUser) {
    return NextResponse.json("User not found", { status: 404 });
  }

  await prisma.vlog.delete({
    where: {
      id: paramsId,
    },
  });

  return NextResponse.json("Data Deleted!", { status: 200 });
}
