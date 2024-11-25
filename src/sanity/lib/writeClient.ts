import "server-only";

import { createClient } from "next-sanity";

import { writeToken, projectId, dataset, apiVersion } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});

if (!writeClient.config().token) {
  throw new Error("Sanity Write Token is not set");
}
