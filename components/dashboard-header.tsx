"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateLinkModal from "./create-link-modal";

type DashboardHeaderProps = {
  userName?: string | null;
};

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Dashboard Overview
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            {userName ? `Welcome back, ${userName}. ` : ""}
            Here is what&apos;s happening with your short links.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Make a new Shawty</span>
        </button>
      </div>

      {showModal && (
        <CreateLinkModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
