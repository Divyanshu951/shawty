import db from "@/db";
import { urlTable } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import LinksManager from "@/components/links-manager";

export const dynamic = "force-dynamic";

const LinksPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userLinks = await db
    .select({
      id: urlTable.id,
      slug: urlTable.slug,
      destinationUrl: urlTable.destinationUrl,
      clickCount: urlTable.clickCount,
      isActive: urlTable.isActive,
      expiresAt: urlTable.expiresAt,
      createdAt: urlTable.createdAt,
    })
    .from(urlTable)
    .where(eq(urlTable.userId, session.user.id))
    .orderBy(desc(urlTable.createdAt));

  return <LinksManager links={userLinks} />;
};

export default LinksPage;
