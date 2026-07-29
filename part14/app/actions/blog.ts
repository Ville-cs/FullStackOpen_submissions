"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";
import { auth } from "@/auth";

export const createBlog = async (
  _prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (
    !title ||
    !author ||
    !url ||
    title.length < 5 ||
    author.length < 5 ||
    url.length < 5
  ) {
    return {
      error: "title, author, and url must contain at least 5 characters",
      values: { title, author, url },
      success: false,
    };
  }
  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return {
    error: "",
    success: true,
  };
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
