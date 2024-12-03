import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-4 bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={144} height={50} />
          </Link>
          <span className="max-sm:hidden pl-2 font-semibold pt-2">
            <span className="font-normal">Hi, </span>
            {session?.user?.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                {" "}
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>ZS</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Sign In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
