"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export type TrendDataPoint = {
  date: string;
  label: string;
  clicks: number;
};

type ClicksTrendChartProps = {
  data7d: TrendDataPoint[];
  data14d: TrendDataPoint[];
  data30d: TrendDataPoint[];
};

export default function ClicksTrendChart({
  data7d,
  data14d,
  data30d,
}: ClicksTrendChartProps) {
  const [range, setRange] = useState<"7d" | "14d" | "30d">("14d");

  const currentData =
    range === "7d" ? data7d : range === "14d" ? data14d : data30d;

  const totalClicks = currentData.reduce((sum, d) => sum + d.clicks, 0);
  const maxClicks = Math.max(...currentData.map((d) => d.clicks), 1);

  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col rounded-xl border p-4 sm:p-6 shadow-sm">
      <div className="mb-5 sm:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline-lg text-on-surface text-base sm:text-lg font-semibold">
              Clicks Trend
            </h3>
            <span className="bg-primary-fixed text-[#9d4300] font-label-mono rounded-full px-2 py-0.5 text-xs font-bold">
              {totalClicks} total
            </span>
          </div>
          <p className="font-body-sm text-xs text-secondary mt-0.5">
            Click traffic volume over the selected timeframe
          </p>
        </div>

        {/* Range Selector (full width on mobile) */}
        <div className="bg-surface-container grid grid-cols-3 sm:flex rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setRange("7d")}
            className={`font-body-sm text-xs rounded-md px-3 py-2 sm:py-1.5 font-medium transition-all text-center ${
              range === "7d"
                ? "bg-surface text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setRange("14d")}
            className={`font-body-sm text-xs rounded-md px-3 py-2 sm:py-1.5 font-medium transition-all text-center ${
              range === "14d"
                ? "bg-surface text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            14 Days
          </button>
          <button
            onClick={() => setRange("30d")}
            className={`font-body-sm text-xs rounded-md px-3 py-2 sm:py-1.5 font-medium transition-all text-center ${
              range === "30d"
                ? "bg-surface text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="border-outline-variant/30 relative flex h-64 w-full items-end gap-1 sm:gap-2 border-b px-1 sm:px-2 pb-6">
        {currentData.map((item, index) => {
          const pct =
            item.clicks === 0
              ? 8
              : Math.max(14, Math.round((item.clicks / maxClicks) * 100));

          return (
            <div
              key={item.date + index}
              className="group relative flex flex-1 flex-col items-center justify-end h-full"
            >
              {/* Tooltip */}
              <div className="bg-inverse-surface text-inverse-on-surface pointer-events-none absolute -top-9 z-20 hidden rounded px-2 py-1 text-[11px] font-semibold whitespace-nowrap shadow-lg group-hover:block">
                {item.clicks} click{item.clicks !== 1 ? "s" : ""} on {item.date}
              </div>

              <motion.div
                key={range + item.date}
                style={{ height: `${pct}%`, transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.02,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`w-full rounded-t-sm transition-colors ${
                  item.clicks > 0
                    ? "bg-primary-dark hover:bg-on-primary-fixed-variant"
                    : "bg-surface-container hover:bg-primary-fixed/40"
                }`}
              />

              {/* Show labels selectively to prevent clutter on 30d */}
              {(range === "7d" ||
                (range === "14d" && index % 2 === 0) ||
                (range === "30d" && index % 5 === 0) ||
                index === currentData.length - 1) && (
                <span className="font-label-mono text-secondary absolute -bottom-5 text-[10px] whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
