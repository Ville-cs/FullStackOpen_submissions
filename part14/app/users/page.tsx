import Link from "next/link";
import { getUsers } from "../services/users";
import {
  Item,
  ItemDescription,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

type User = {
  id: number;
  username: string;
  name: string;
};

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-5xl mr-20 my-10 text-center">Users</h2>
      <ul>
        {users.map((user: User) => (
          <Item
            key={user.id}
            className="my-3 p-5 border hover:text-blue-400 text-2xl"
            variant={"outline"}
          >
            <Link href={`/users/${user.username}`}>
              <ItemContent>
                <ItemTitle>{user.name}</ItemTitle>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Users;
