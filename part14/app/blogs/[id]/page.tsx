import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { incrementBlogLikes } from "../../actions/blog";
import Description from "./Description";
import Content from "./Content";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/app/services/session";
import { addToReadingList } from "@/app/actions/readingList";
import { isOnUserReadingList } from "@/app/services/readingLists";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const user = await getCurrentUser();

  if (!blog) {
    notFound();
  }

  const onReadingList = await isOnUserReadingList(blog.id);

  return (
    <div data-testid="blog-detail">
      <div className="text-5xl" data-testid="blog-title">
        {blog.title}
      </div>
      <Description>
        by
        <Content data-testid="blog-author"> {blog.author}</Content>
      </Description>
      <Description>
        read the blog here:
        <Content> {blog.url}</Content>
      </Description>
      <Description>
        likes
        <Content> {blog.likes}</Content>
      </Description>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <Button
          type="submit"
          variant={"secondary"}
          size={"lg"}
          className={"text-2xl px-5 py-7"}
        >
          Like this blog
        </Button>
      </form>
      {user && !onReadingList ? (
        <form action={addToReadingList} className="mt-5">
          <input type="hidden" name="blogId" value={blog.id} />
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="button"
            data-testid="add-to-reading-list-button"
          >
            Add to your reading list
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default BlogPage;
