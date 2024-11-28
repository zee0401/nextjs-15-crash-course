import { client } from "@/sanity/lib/client";
import { AUTHOR_STARTUP_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartupCard = async ({ id }: { id: string }) => {
  const startups = await client.fetch(AUTHOR_STARTUP_QUERY, { id });

  console.log(startups);
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartupCard;
