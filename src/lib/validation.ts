import { z } from "zod";

export const startupFormSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(5000),
  category: z.string().min(3).max(100),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
