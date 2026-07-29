import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter || "");
  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2 className="text-5xl mr-20 my-10 text-center">Blogs</h2>
      <form action="/blogs" className="flex justify-center items-center mb-10">
        <Input
          type="text"
          name="filter"
          defaultValue={filter || ""}
          className="mr-5 py-2 w-xl"
          data-testid="filter-input"
        />
        <Button
          type="submit"
          className="p-5 text-xl"
          variant={"secondary"}
          data-testid="search-button"
        >
          filter blogs by title
        </Button>
      </form>
      <ul data-testid="blogs-list">
        {blogs.map((blog) => (
          <Item
            key={blog.id}
            className="my-3 p-5 border hover:text-blue-400 text-2xl"
            variant={"outline"}
          >
            <Link href={`/blogs/${blog.id}`} data-testid="link">
              <ItemContent>
                <ItemTitle>{blog.title}</ItemTitle>
                <ItemDescription>{blog.likes} likes</ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
