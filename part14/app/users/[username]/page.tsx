import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-4xl text-center">Profile of {user.name}</h2>
      <p className="my-5 text-2xl">Username: {user.username}</p>
      <h3 className="my-5 text-2xl">Blogs added by the user</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li
            key={blog.id}
            className="my-3 p-5 border hover:text-blue-400 text-2xl"
          >
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
