import BreakdownCard, {
  BreakdownItem,
} from "@/components/analytics/breakdown-card";
import ClicksTrendChart, {
  TrendDataPoint,
} from "@/components/analytics/clicks-trend-chart";
import TopLinksTable, {
  TopLinkItem,
} from "@/components/analytics/top-links-table";
import DashboardHeader from "@/components/dashboard-header";
import StatCard from "@/components/stat-card";
import db from "@/db";
import { clicks, urlTable } from "@/db/schemas";
import getSession from "@/lib/get-session";
import { desc, eq, inArray } from "drizzle-orm";
import {
  BarChart3,
  Compass,
  Globe2,
  Laptop,
  Monitor,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  // 1. Fetch user's links
  const userUrls = await db
    .select({
      id: urlTable.id,
      slug: urlTable.slug,
      destinationUrl: urlTable.destinationUrl,
      clickCount: urlTable.clickCount,
      createdAt: urlTable.createdAt,
    })
    .from(urlTable)
    .where(eq(urlTable.userId, userId))
    .orderBy(desc(urlTable.clickCount));

  const totalLinks = userUrls.length;
  const totalClicks = userUrls.reduce((acc, u) => acc + u.clickCount, 0);

  // Top links with percentage calculation
  const topLinks: TopLinkItem[] = userUrls.slice(0, 10).map((u) => ({
    id: u.id,
    slug: u.slug,
    destinationUrl: u.destinationUrl,
    clickCount: u.clickCount,
    percentage:
      totalClicks > 0 ? Math.round((u.clickCount / totalClicks) * 100) : 0,
  }));

  // 2. Fetch detailed clicks
  const urlIds = userUrls.map((u) => u.id);
  let allClicks: (typeof clicks.$inferSelect)[] = [];

  if (urlIds.length > 0) {
    try {
      allClicks = await db
        .select()
        .from(clicks)
        .where(inArray(clicks.urlId, urlIds));
    } catch {
      allClicks = [];
    }
  }

  // 3. Helper to generate trend data
  const generateTrendData = (days: number): TrendDataPoint[] => {
    const clickDateMap: Record<string, number> = {};

    allClicks.forEach((c) => {
      const dateKey = new Date(c.clickedAt).toISOString().split("T")[0];
      clickDateMap[dateKey] = (clickDateMap[dateKey] || 0) + 1;
    });

    const result: TrendDataPoint[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];

      result.push({
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        label: d.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
        clicks: clickDateMap[dateKey] || 0,
      });
    }
    return result;
  };

  const trend7d = generateTrendData(7);
  const trend14d = generateTrendData(14);
  const trend30d = generateTrendData(30);

  // 4. Aggregations for breakdowns
  const computeBreakdown = (
    accessor: (c: typeof clicks.$inferSelect) => string | null,
    defaultLabel = "Direct / Unknown",
  ): BreakdownItem[] => {
    if (allClicks.length === 0) return [];

    const counts: Record<string, number> = {};
    allClicks.forEach((c) => {
      const val = accessor(c) || defaultLabel;
      counts[val] = (counts[val] || 0) + 1;
    });

    const total = allClicks.length;
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([label, count]) => ({
        label,
        count,
        percentage: Math.round((count / total) * 100),
      }));
  };

  const deviceBreakdown = computeBreakdown((c) => c.device, "Desktop");
  const browserBreakdown = computeBreakdown((c) => c.browser, "Chrome");
  const osBreakdown = computeBreakdown((c) => c.os, "Windows");
  const referrerBreakdown = computeBreakdown((c) => {
    if (!c.referrer) return "Direct";
    try {
      const host = new URL(c.referrer).hostname.replace("www.", "");
      return host;
    } catch {
      return c.referrer;
    }
  }, "Direct");

  // Top link name
  const topLinkName = topLinks.length > 0 ? `/${topLinks[0].slug}` : "None";
  const topLinkClicks = topLinks.length > 0 ? topLinks[0].clickCount : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader userName={session.user.name} />

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clicks"
          value={totalClicks.toLocaleString()}
          icon={TrendingUp}
          iconBgClass="bg-primary-fixed"
          iconColorClass="text-[#9d4300]"
          subtext="across all links"
        />

        <StatCard
          title="Top Performing Shawty"
          value={topLinkName}
          icon={BarChart3}
          iconBgClass="bg-primary-fixed"
          iconColorClass="text-[#9d4300]"
          subtext={`${topLinkClicks} clicks`}
        />

        <StatCard
          title="Total Links"
          value={totalLinks}
          icon={Globe2}
          iconBgClass="bg-primary-fixed"
          iconColorClass="text-[#9d4300]"
          subtext="active URLs"
        />

        <StatCard
          title="Logged Events"
          value={allClicks.length.toLocaleString()}
          icon={Users}
          iconBgClass="bg-primary-fixed"
          iconColorClass="text-[#9d4300]"
          subtext="detailed click records"
        />
      </div>

      {/* Clicks Trend Chart */}
      <ClicksTrendChart
        data7d={trend7d}
        data14d={trend14d}
        data30d={trend30d}
      />

      {/* Top Links Table */}
      <TopLinksTable links={topLinks} />

      {/* Traffic Breakdowns: 4-column or 2x2 grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <BreakdownCard
          title="Referrers"
          description="Traffic sources"
          icon={Share2}
          items={referrerBreakdown}
          emptyMessage="No referrer data yet. Links may be opened directly."
        />

        <BreakdownCard
          title="Devices"
          description="Hardware category"
          icon={Laptop}
          items={deviceBreakdown}
          emptyMessage="No device data recorded yet."
        />

        <BreakdownCard
          title="Browsers"
          description="Web clients used"
          icon={Compass}
          items={browserBreakdown}
          emptyMessage="No browser data recorded yet."
        />

        <BreakdownCard
          title="Operating Systems"
          description="Client platforms"
          icon={Monitor}
          items={osBreakdown}
          emptyMessage="No OS data recorded yet."
        />
      </div>
    </div>
  );
}
