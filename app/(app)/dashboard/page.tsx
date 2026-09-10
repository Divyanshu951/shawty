import ClickActivityChart, {
  DailyClickData,
} from "@/components/click-activity-chart";
import DashboardHeader from "@/components/dashboard-header";
import QuickShortenForm from "@/components/quick-shorten-form";
import RecentLinks from "@/components/recent-links";
import StatCard from "@/components/stat-card";
import db from "@/db";
import { clicks, urlTable } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { and, count, desc, eq, gte, inArray, sql } from "drizzle-orm";
import {
  BarChart3,
  CheckCircle2,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  // 1. Fetch user's links and basic aggregates
  const userUrls = await db
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
    .where(eq(urlTable.userId, userId))
    .orderBy(desc(urlTable.createdAt));

  const totalLinks = userUrls.length;
  const activeLinks = userUrls.filter((u) => u.isActive).length;
  const totalClicks = userUrls.reduce((acc, u) => acc + u.clickCount, 0);
  const avgClicksPerLink =
    totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0.0";

  // Recent 5 links
  const recentLinks = userUrls.slice(0, 5);

  // 2. Fetch last 7 days clicks
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const urlIds = userUrls.map((u) => u.id);
  const clickMap: Record<string, number> = {};

  if (urlIds.length > 0) {
    try {
      const recentClickRows = await db
        .select({
          clickedAt: clicks.clickedAt,
        })
        .from(clicks)
        .where(
          and(
            inArray(clicks.urlId, urlIds),
            gte(clicks.clickedAt, sevenDaysAgo),
          ),
        );

      recentClickRows.forEach((row) => {
        const dateKey = new Date(row.clickedAt).toISOString().split("T")[0];
        clickMap[dateKey] = (clickMap[dateKey] || 0) + 1;
      });
    } catch {
      // If clicks table query encounters any issue, fallback gracefully
    }
  }

  // Generate 7-day array up to today
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData: DailyClickData[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    const dayName = dayNames[d.getDay()];
    const isToday = i === 0;

    weeklyData.push({
      day: dayName,
      dateStr: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      clicks: clickMap[dateKey] || 0,
      active: isToday,
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader userName={session.user.name} />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clicks"
          value={totalClicks.toLocaleString()}
          icon={TrendingUp}
          iconBgClass="bg-primary-fixed"
          iconColorClass="text-[#9d4300]"
          subtext="across all shawties"
        />

        <StatCard
          title="Total Shawties"
          value={totalLinks}
          icon={Globe2}
          iconBgClass="bg-blue-100 dark:bg-blue-950"
          iconColorClass="text-blue-600 dark:text-blue-400"
          subtext="created links"
        />

        <StatCard
          title="Active Links"
          value={activeLinks}
          icon={CheckCircle2}
          iconBgClass="bg-green-100 dark:bg-green-950"
          iconColorClass="text-green-600 dark:text-green-400"
          subtext={`${totalLinks - activeLinks} inactive`}
        />

        <StatCard
          title="Avg. Clicks / Link"
          value={avgClicksPerLink}
          icon={BarChart3}
          iconBgClass="bg-purple-100 dark:bg-purple-950"
          iconColorClass="text-purple-600 dark:text-purple-400"
          subtext="engagement rate"
        />
      </div>

      {/* Middle section: Quick Shorten & Activity Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col justify-center rounded-xl border p-6 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-headline-lg text-on-surface text-lg font-semibold">
              Quick Shorten
            </h3>
            <p className="font-body-sm text-xs text-secondary mt-0.5">
              Create a quick short link in seconds.
            </p>
          </div>
          <QuickShortenForm />
        </div>

        <div className="lg:col-span-3">
          <ClickActivityChart data={weeklyData} />
        </div>
      </div>

      {/* Recent Links Section */}
      <RecentLinks links={recentLinks} />
    </div>
  );
};

export default DashboardPage;
