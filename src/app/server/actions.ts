"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeClient } from "@/sanity/lib/writeClient";
import { auth } from "../../../auth";
import { parseServerActionResponse } from "../../lib/utils";
import slugify from "slugify";

export const createPitchAction = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "You need to be logged in to create a pitch.",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { strict: true, lower: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: "Please enter a valid title.",
      status: "ERROR",
    });
  }
};
