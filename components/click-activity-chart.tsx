"use client";
import { motion } from "framer-motion";

export default function ClickActivityChart() {
  const bars = [
    { height: "30%", day: "Mon" },
    { height: "45%", day: "Tue" },
    { height: "20%", day: "Wed" },
    { height: "60%", day: "Thu" },
    { height: "85%", day: "Fri", active: true },
    { height: "50%", day: "Sat" },
    { height: "70%", day: "Sun" },
  ];

  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 mb-8 flex h-80 flex-col rounded-md border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-body-md text-body-md text-on-surface font-semibold">
          Click Activity
        </h3>
        <p className="font-body-md text-body-md text-on-surface font-semibold">
          Last 7 Days
        </p>
      </div>

      <div className="border-outline-variant/30 relative mb-2 flex w-full flex-1 items-end gap-2 border-b px-2 pb-6">
        {bars.map((bar, index) => (
          <motion.div
            key={bar.day}
            style={{ height: bar.height, transformOrigin: "bottom" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1], // Smooth custom ease curve
            }}
            className={
              bar.active
                ? "bg-primary-dark relative w-full rounded-t-sm shadow-[0_-4px_12px_rgba(37,99,235,0.2)]"
                : "bg-primary-fixed/60 group hover:bg-primary/20 relative w-full cursor-pointer rounded-t-sm transition-colors"
            }
          />
        ))}

        <div className="absolute bottom-0 left-0 flex w-full translate-y-full transform items-center justify-around pt-2 font-mono text-base">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span className="text-primary font-bold">Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
