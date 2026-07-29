import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { readingLists } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getUserReadingLists = async () => {
  const user = await getCurrentUser();
  if (!user) return;
  return db.query.readingLists.findMany({
    where: eq(readingLists.userId, user.id),
  });
};

export const getFilteredUserReadingLists = async (filter: boolean) => {
  const user = await getCurrentUser();
  if (!user) return [];
  return await db.query.readingLists.findMany({
    where: and(eq(readingLists.userId, user.id), eq(readingLists.read, filter)),
    with: {
      blog: true,
    },
  });
};

export const isOnUserReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) return false;
  const result = await db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.userId, user.id),
      eq(readingLists.blogId, blogId),
    ),
  });
  return result ? true : false;
};

export const getReadingListById = async (id: number) => {
  return db.query.readingLists.findFirst({
    where: eq(readingLists.id, id),
  });
};

export const markAsRead = async (id: number) => {
  const user = await getCurrentUser();
  if (!user) return;
  const readingList = await getReadingListById(id);
  if (!readingList) return;
  await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, id));
};
