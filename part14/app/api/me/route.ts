import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const GET = async (_req: NextRequest) => {
  const authorization = (await headers()).get("authorization");
  if (!authorization && !authorization?.startsWith("Bearer "))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = authorization.replace("Bearer ", "");

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: {
        columns: {
          title: true,
          author: true,
          url: true,
        },
      },
      readingLists: true,
    },
  });
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(user);
};
