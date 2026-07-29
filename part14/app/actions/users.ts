"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { getCurrentUser } from "../services/session";
import { randomUUID } from "crypto";

export const registerUser = async (
  _prevState: { error: string },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const values = { username, name, password, confirmPassword };
  if (!name)
    return {
      error: "name cannot be null",
      values,
    };
  if (password !== confirmPassword)
    return {
      error: "password inputs do not match",
      values,
    };
  if (!username || !password || username.length < 4 || password.length < 4) {
    return {
      error: "username and password must contain at least 4 characters",
      values,
    };
  }
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (user) return { error: "username already exists", values };

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const uuid = randomUUID();
  await db
    .update(users)
    .set({ token: uuid })
    .where(eq(users.id, user.id))
    .returning({ token: users.token });
  revalidatePath("/me");
};
