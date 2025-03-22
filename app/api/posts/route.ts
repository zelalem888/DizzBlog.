import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { auth } from "@/app/auth";
// import { JWT } from "next-auth/jwt";

export async function GET() {
    const [vlogs,user] = await Promise.all([
        prisma.vlog.findMany(),
        prisma.user.findMany()
    ]);
    return NextResponse.json({vlogs,user})
     
    
    
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const session = await auth(); // Get session data

    if (!session || !session.user) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const userEmail = session.user.email; // Get email from session

    // Ensure email is defined
    if (!userEmail) {
        return NextResponse.json({ error: "User email is missing" }, { status: 400 });
    }

    // Check if the user exists in the database, or create them if they don't
    let user = await prisma.user.findUnique({
        where: { email: userEmail }
    });

    if (!user) {
        // Create a new user if they don't exist
        user = await prisma.user.create({
            data: {
                email: userEmail,
                name: session.user.name || "Unknown", // Fallback name
                image: session.user.image || null // Fallback image
            }
        });
    }

    // Validate required fields
    if (!body.title) {
        return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }
    

    try {
        const addVlog = await prisma.vlog.create({
            data: {
                title: body.title,
                description: body.description,
                publicId: body.images,
                authorId: user.id// Use the user's ID from the database
            }
        });

        return NextResponse.json(addVlog, { status: 201 });
    } catch (error) {
        console.error("Failed to create vlog:", error);
        return NextResponse.json({ error: "Failed to create vlog" }, { status: 500 });
    }
}