"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { readingLists } from "@/db/schema";
import { markAsRead } from "../services/readingLists";

export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));
  const userId = Number(formData.get("userId"));
  await db.insert(readingLists).values({ userId: userId, blogId: blogId });
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/blogs");
};

export const updateReadStatus = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await markAsRead(id);
  revalidatePath("/me");
};
