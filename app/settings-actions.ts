"use server";

import db from "@/db";
import { user } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type UpdateProfileResult = {
  status: "success" | "failed";
  message: string;
  error: string;
};

export async function updateUserProfile(name: string): Promise<UpdateProfileResult> {
  const session = await getSession();

  if (!session) {
    return {
      status: "failed",
      message: "",
      error: "You must be logged in to update your profile.",
    };
  }

  const trimmedName = name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    return {
      status: "failed",
      message: "",
      error: "Name must be at least 2 characters long.",
    };
  }

  if (trimmedName.length > 50) {
    return {
      status: "failed",
      message: "",
      error: "Name cannot exceed 50 characters.",
    };
  }

  try {
    await db
      .update(user)
      .set({
        name: trimmedName,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/settings");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Profile updated successfully.",
      error: "",
    };
  } catch {
    return {
      status: "failed",
      message: "",
      error: "Failed to update profile. Please try again.",
    };
  }
}
