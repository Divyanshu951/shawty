"use server";
import db from "@/db";
import { urlTable } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ActionResult = {
  status: "success" | "failed";
  message: string;
  error: string;
};

export async function deleteLink(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    return { status: "failed", message: "", error: "Not authenticated." };
  }

  try {
    const [deleted] = await db
      .delete(urlTable)
      .where(and(eq(urlTable.id, id), eq(urlTable.userId, session.user.id)))
      .returning({ id: urlTable.id });

    if (!deleted) {
      return {
        status: "failed",
        message: "",
        error: "Link not found or you don't have permission.",
      };
    }

    revalidatePath("/links");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Link deleted successfully.",
      error: "",
    };
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Could not delete the link.",
    };
  }
}

export async function toggleLinkActive(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    return { status: "failed", message: "", error: "Not authenticated." };
  }

  try {
    // First get the current state
    const [link] = await db
      .select({ isActive: urlTable.isActive })
      .from(urlTable)
      .where(and(eq(urlTable.id, id), eq(urlTable.userId, session.user.id)))
      .limit(1);

    if (!link) {
      return {
        status: "failed",
        message: "",
        error: "Link not found or you don't have permission.",
      };
    }

    await db
      .update(urlTable)
      .set({
        isActive: !link.isActive,
        updatedAt: new Date(),
      })
      .where(and(eq(urlTable.id, id), eq(urlTable.userId, session.user.id)));

    revalidatePath("/links");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: link.isActive ? "Link deactivated." : "Link activated.",
      error: "",
    };
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Could not update the link.",
    };
  }
}

export async function updateLink(data: {
  id: string;
  destinationUrl: string;
  customAlias: string;
  expiresAt?: string;
}): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    return { status: "failed", message: "", error: "Not authenticated." };
  }

  // Basic validation
  try {
    const url = new URL(data.destinationUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        status: "failed",
        message: "",
        error: "URL must start with http:// or https://",
      };
    }
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Please enter a valid URL.",
    };
  }

  if (!data.customAlias || data.customAlias.length < 3) {
    return {
      status: "failed",
      message: "",
      error: "Alias must be at least 3 characters.",
    };
  }

  if (!/^[a-zA-Z0-9-]+$/.test(data.customAlias)) {
    return {
      status: "failed",
      message: "",
      error: "Only letters, numbers, and hyphens are accepted.",
    };
  }

  try {
    // Check if the slug is taken by someone else
    const [existing] = await db
      .select({ id: urlTable.id })
      .from(urlTable)
      .where(eq(urlTable.slug, data.customAlias))
      .limit(1);

    if (existing && existing.id !== data.id) {
      return {
        status: "failed",
        message: "",
        error: "This alias is already taken.",
      };
    }

    await db
      .update(urlTable)
      .set({
        destinationUrl: data.destinationUrl,
        slug: data.customAlias,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        updatedAt: new Date(),
      })
      .where(
        and(eq(urlTable.id, data.id), eq(urlTable.userId, session.user.id)),
      );

    revalidatePath("/links");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Link updated successfully.",
      error: "",
    };
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Could not update the link.",
    };
  }
}
