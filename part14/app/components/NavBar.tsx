"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";
import { redirect } from "next/navigation";

export default function NavBar() {
  const { data: session } = useSession();

  const signOutAndRedirect = () => {
    signOut();
    redirect("/");
  };

  return (
    <nav className="px-50 flex items-center gap-5 py-5 bg-background-secondary">
      <NavLink href="/">home</NavLink>
      {" | "}
      <NavLink href="/blogs">blogs</NavLink>
      {" | "}
      <NavLink href="/users">users</NavLink>
      {" | "}
      {session ? (
        <>
          <NavLink href="/blogs/new">create new</NavLink>
          <div className="ml-auto flex items-center gap-5">
            <NavLink href="/me">me</NavLink>
            <button
              onClick={() => signOutAndRedirect()}
              className="hover:text-blue-500 text-xl"
            >
              logout
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink href="/login">login</NavLink>
          {" | "}
          <NavLink href="/register">register</NavLink>
        </>
      )}
    </nav>
  );
}
