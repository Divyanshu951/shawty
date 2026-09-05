import ClickActivityChart from "@/components/click-activity-chart";
import { Link, Plus, TrendingUp } from "lucide-react";

const Page = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Dashboard Overview
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage your shawties.
          </p>
        </div>
        <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex items-center gap-2 rounded-md px-6 py-3 font-semibold shadow-sm transition-colors">
          <span className="material-symbols-outlined">
            <Plus size={22} />
          </span>
          Make a new Shawty
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col justify-center rounded-md border p-6 shadow-sm lg:col-span-2">
          <h3 className="font-body-md text-body-md text-on-surface mb-4 font-semibold">
            Quick Shorten
          </h3>

          <div className="space-y-3">
            <div className="relative flex items-center rounded-md shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
              <span className="text-secondary absolute left-4">
                <Link size={18} />
              </span>

              <input
                type="url"
                placeholder="Paste a long URL here..."
                className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-label-mono text-on-surface bg-surface-container-lowest placeholder-secondary h-14 w-full rounded-[8px] border py-4 pr-32 pl-12 transition-all outline-none focus:ring-1"
              />

              <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant absolute top-2 right-2 bottom-2 rounded-[6px] px-4 font-semibold transition-colors">
                Shorten
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="border-outline-variant/50 bg-surface-container flex h-11 items-center rounded-md border px-3">
                <span className="text-secondary text-sm">
                  link.shawty.online/
                </span>
              </div>

              <input
                type="text"
                placeholder="custom-alias"
                className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark text-on-surface bg-surface-container-lowest placeholder-secondary h-11 flex-1 rounded-md border px-3 text-sm outline-none focus:ring-1"
              />
            </div>

            <p className="text-secondary flex gap-10 text-xs">
              Optional. Use letters, numbers, and hyphens.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col rounded-md border p-6 shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-body-md text-body-md text-on-surface font-semibold">
              Total Clicks
            </h3>
            <span className="material-symbols-outlined bg-primary-fixed rounded-md p-2 text-[#9d4300]">
              <TrendingUp size={22} />
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <span className="font-display-lg text-display-lg text-on-surface">
              124.5K
            </span>
            <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
              <span className="text-primary font-semibold">+14.2%</span> this
              month
            </p>
          </div>
        </div>
      </div>

      <ClickActivityChart />
    </div>
  );
};

export default Page;
