import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  try {
    const body = await req.json();
    const passwordHash = await bcrypt.hash(body.password, 10);
    await db
      .insert(users)
      .values({ username: body.username, name: body.name, passwordHash });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
};
