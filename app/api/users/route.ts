import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        links: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.clerkId || !body.email || !body.username) {
      return NextResponse.json(
        { error: "clerkId, email, and username are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        clerkId: body.clerkId,
        email: body.email,
        username: body.username.toLowerCase(),
      },
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}