import React, { Suspense } from "react";
import { auth } from "../../../../../auth";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_AUTHORID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartupCard from "@/components/UserStartupCard";
import { StartupCardSkeleton } from "@/components/StartupCardSkeleton";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await auth();
  if (!session) {
    return <div>You need to be logged in to view this page.</div>;
  }

  const user = await client.fetch(STARTUP_BY_AUTHORID_QUERY, { id });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartupCard id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
