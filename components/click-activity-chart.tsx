"use client";
import { motion } from "framer-motion";

export type DailyClickData = {
  day: string;
  dateStr: string;
  clicks: number;
  active?: boolean;
};

type ClickActivityChartProps = {
  data?: DailyClickData[];
};

export default function ClickActivityChart({ data }: ClickActivityChartProps) {
  // Default data fallback if not provided
  const chartData = data && data.length === 7
    ? data
    : [
        { day: "Mon", dateStr: "Mon", clicks: 0 },
        { day: "Tue", dateStr: "Tue", clicks: 0 },
        { day: "Wed", dateStr: "Wed", clicks: 0 },
        { day: "Thu", dateStr: "Thu", clicks: 0 },
        { day: "Fri", dateStr: "Fri", clicks: 0 },
        { day: "Sat", dateStr: "Sat", clicks: 0 },
        { day: "Sun", dateStr: "Sun", clicks: 0, active: true },
      ];

  const maxClicks = Math.max(...chartData.map((d) => d.clicks), 1);
  const totalClicksThisWeek = chartData.reduce((acc, d) => acc + d.clicks, 0);

  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 flex h-80 flex-col rounded-xl border p-4 sm:p-6 shadow-sm">
      <div className="mb-5 sm:mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-headline-lg text-on-surface text-base sm:text-lg font-semibold">
            Click Activity
          </h3>
          <p className="font-body-sm text-xs text-secondary mt-0.5">
            {totalClicksThisWeek} total click{totalClicksThisWeek !== 1 ? "s" : ""} in the last 7 days
          </p>
        </div>
        <span className="bg-surface-container font-label-mono text-secondary rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold">
          Last 7 Days
        </span>
      </div>

      <div className="border-outline-variant/30 relative mb-2 flex w-full flex-1 items-end gap-1.5 sm:gap-3 border-b px-1 sm:px-2 pb-6">
        {chartData.map((item, index) => {
          // Height percentage between 10% and 100%
          const pct =
            item.clicks === 0
              ? 8
              : Math.max(15, Math.round((item.clicks / maxClicks) * 100));

          return (
            <div
              key={item.day + index}
              className="group relative flex flex-1 flex-col items-center justify-end h-full"
            >
              {/* Tooltip on hover */}
              <div className="bg-inverse-surface text-inverse-on-surface pointer-events-none absolute -top-8 z-20 hidden rounded px-2 py-1 text-[11px] font-semibold whitespace-nowrap shadow-md group-hover:block">
                {item.clicks} click{item.clicks !== 1 ? "s" : ""} ({item.dateStr})
              </div>

              <motion.div
                style={{ height: `${pct}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`w-full rounded-t-md transition-all ${
                  item.active
                    ? "bg-primary-dark shadow-[0_-4px_12px_rgba(37,99,235,0.25)]"
                    : item.clicks > 0
                    ? "bg-primary-fixed hover:bg-primary-dark/80"
                    : "bg-surface-container hover:bg-primary-fixed/50"
                }`}
              />

              <span
                className={`font-label-mono mt-2 text-xs transition-colors ${
                  item.active
                    ? "text-primary-dark font-bold"
                    : "text-secondary group-hover:text-on-surface"
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
