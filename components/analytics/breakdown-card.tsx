import { LucideIcon } from "lucide-react";

export type BreakdownItem = {
  label: string;
  count: number;
  percentage: number;
  icon?: LucideIcon;
};

type BreakdownCardProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  items: BreakdownItem[];
  emptyMessage?: string;
};

export default function BreakdownCard({
  title,
  description,
  icon: HeaderIcon,
  items,
  emptyMessage = "No data recorded yet",
}: BreakdownCardProps) {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col justify-between rounded-xl border p-6 shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-headline-lg text-on-surface text-base font-semibold">
              {title}
            </h3>
            {description && (
              <p className="font-body-sm text-xs text-secondary mt-0.5">
                {description}
              </p>
            )}
          </div>
          <div className="bg-surface-container text-secondary flex size-8 items-center justify-center rounded-lg">
            <HeaderIcon size={16} />
          </div>
        </div>

        {items.length > 0 ? (
          <div className="space-y-3.5">
            {items.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.label + index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-medium text-on-surface">
                      {ItemIcon && <ItemIcon size={14} className="text-secondary" />}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-mono text-secondary">
                        {item.count.toLocaleString()}
                      </span>
                      <span className="font-label-mono text-on-surface font-semibold">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary-dark h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(3, item.percentage))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="font-body-sm text-xs text-secondary">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
