import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../auth";
import { redirect } from "next/dist/server/api-utils";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-4 bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={50} />
        </Link>

        <div className="flex items-center gap-4">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Sign out</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
