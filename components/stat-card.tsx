import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgClass?: string;
  iconColorClass?: string;
  trendText?: string;
  trendPositive?: boolean;
  subtext?: string;
  children?: ReactNode;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-primary-fixed",
  iconColorClass = "text-primary-dark",
  trendText,
  trendPositive = true,
  subtext,
}: StatCardProps) {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 relative flex flex-col justify-between overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-body-md text-body-md text-secondary font-medium">
          {title}
        </h3>
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${iconBgClass} ${iconColorClass}`}
        >
          <Icon size={20} />
        </div>
      </div>

      <div>
        <span className="font-display-lg text-3xl font-bold tracking-tight text-on-surface">
          {value}
        </span>

        {(trendText || subtext) && (
          <div className="font-body-sm text-xs text-secondary mt-1.5 flex items-center gap-1.5">
            {trendText && (
              <span
                className={`font-semibold ${
                  trendPositive ? "text-green-600 dark:text-green-400" : "text-red-500"
                }`}
              >
                {trendText}
              </span>
            )}
            {subtext && <span>{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
