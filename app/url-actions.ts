"use server";
import { nanoid } from "nanoid";
import { INITIAL_QUICK_URL_STATE } from "@/types/url";
import { createUrlSchema } from "@/validations/url-validations";
import db from "@/db";
import { urlTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export async function createShortenLink(
  _previousState: INITIAL_QUICK_URL_STATE,
  formData: FormData,
): Promise<INITIAL_QUICK_URL_STATE> {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signup");
  }

  const rawData = Object.fromEntries(formData.entries());

  const validationResult = createUrlSchema.safeParse({
    destinationUrl: rawData.destinationUrl?.toString(),
    customAlias: rawData.customAlias?.toString() || undefined,
  });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;

    return {
      status: "failed",
      message: "",
      error:
        errors.destinationUrl?.[0] ??
        errors.customAlias?.[0] ??
        "Invalid input.",
    };
  }

  const { destinationUrl, customAlias } = validationResult.data;

  let slug = customAlias;

  if (customAlias) {
    const [existing] = await db
      .select({ slug: urlTable.slug })
      .from(urlTable)
      .where(eq(urlTable.slug, customAlias))
      .limit(1);

    if (existing) {
      return {
        status: "failed",
        message: "",
        error: "The alias is already taken.",
      };
    }
  }

  slug = customAlias ?? nanoid(6);

  try {
    const [newUrl] = await db
      .insert(urlTable)
      .values({
        userId: session.user.id,
        destinationUrl,
        slug,
      })
      .returning({
        slug: urlTable.slug,
      });

    return {
      status: "success",
      message: "URL shortened successfully.",
      error: "",
      url: `https://link.shawty.online/${newUrl.slug}`,
    };
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Could not create shortened URL.",
    };
  }
}
