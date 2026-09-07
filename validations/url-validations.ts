import { z } from "zod";

export const createUrlSchema = z.object({
  destinationUrl: z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          const url = new URL(value);
          return ["http:", "https:"].includes(url.protocol);
        } catch {
          return false;
        }
      },
      {
        message: "URL must start with http:// or https://",
      },
    ),

  customAlias: z
    .string()
    .trim()
    .min(3, "Minimum 3 characters needed.")
    .max(30, "Maximum 30 characters allowed.")
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Only letters, numbers, and hyphens are accepted.",
    })
    .optional(),
});
