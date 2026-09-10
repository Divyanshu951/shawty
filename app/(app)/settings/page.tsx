import SettingsForm from "@/components/settings-form";
import db from "@/db";
import { urlTable } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { count, eq } from "drizzle-orm";
import { Sparkles, StarCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const SettingsPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  // Count user's total links
  const [linksCount] = await db
    .select({ total: count() })
    .from(urlTable)
    .where(eq(urlTable.userId, session.user.id));

  const totalLinks = linksCount?.total || 0;
  const planLimit = 1000;
  const usagePercentage = Math.min(
    100,
    Math.round((totalLinks / planLimit) * 100),
  );

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Account Settings
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage your profile, account preferences, and usage limits.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Profile Settings Form */}
        <SettingsForm user={session.user} totalLinks={totalLinks} />

        {/* Subscription / Plan Card */}
        <section className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-[#9d4300] p-5 text-white shadow-lg sm:p-6 md:p-8 lg:w-84 lg:shrink-0">
          <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>

          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-label-mono text-xs tracking-wider uppercase opacity-80">
                Current Plan
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                <StarCheck size={22} />
              </span>
            </div>

            <h3 className="font-display-lg text-3xl font-bold">
              Standard Free
            </h3>
            <p className="font-body-sm mt-1 mb-8 text-xs opacity-80">
              Community Tier · Free forever
            </p>

            {/* Usage Progress */}
            <div className="mb-8 space-y-3">
              <div className="flex items-end justify-between text-xs">
                <span className="font-label-mono opacity-90">
                  Links Created
                </span>
                <span className="font-label-mono font-bold">
                  {totalLinks.toLocaleString()} / {planLimit.toLocaleString()}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-black/25">
                <div
                  className="relative h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${Math.max(4, usagePercentage)}%` }}
                >
                  <div className="absolute top-0 right-0 h-full w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"></div>
                </div>
              </div>

              <p className="font-label-mono text-right text-[11px] opacity-75">
                {planLimit - totalLinks > 0
                  ? `${planLimit - totalLinks} links remaining`
                  : "Limit reached"}
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-2.5">
            <div className="mb-3 flex items-center gap-2 text-xs opacity-90">
              <Sparkles size={14} className="shrink-0 text-amber-300" />
              <span>Unlimited clicks & QR codes included</span>
            </div>

            <Link href="/pricing">
              <button className="font-body-sm w-full cursor-pointer rounded-lg bg-white py-3 text-sm font-bold text-[#9d4300] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
