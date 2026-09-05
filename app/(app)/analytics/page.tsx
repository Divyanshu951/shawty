import { Plus } from "lucide-react";

const Page = () => {
  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Dashboard Overview
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage your shawties.
          </p>
        </div>
        <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-colors">
          <span className="material-symbols-outlined">
            <Plus size={22} />
          </span>
          Make a new Shawty
        </button>
      </div>
    </div>
  );
};

export default Page;
