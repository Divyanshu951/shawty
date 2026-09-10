"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Link2,
  Plus,
  BarChart,
  Settings,
} from "lucide-react";
import CreateLinkModal from "./create-link-modal";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
    },
    {
      label: "Links",
      icon: Link2,
      path: "/links",
    },
    {
      label: "Analytics",
      icon: BarChart,
      path: "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/30 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-around relative">
          {/* Left items: Overview, Links */}
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs transition-colors min-w-[56px] ${
              pathname === "/dashboard"
                ? "text-primary-dark font-bold"
                : "text-secondary hover:text-on-surface font-medium"
            }`}
          >
            <LayoutDashboardIcon size={20} />
            <span className="text-[10px] mt-0.5">Overview</span>
          </Link>

          <Link
            href="/links"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs transition-colors min-w-[56px] ${
              pathname === "/links"
                ? "text-primary-dark font-bold"
                : "text-secondary hover:text-on-surface font-medium"
            }`}
          >
            <Link2 size={20} />
            <span className="text-[10px] mt-0.5">Links</span>
          </Link>

          {/* Center elevated Create (+) Button */}
          <div className="flex flex-col items-center justify-center -mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              aria-label="Create new Shawty"
              className="bg-primary-dark text-white size-12 rounded-full flex items-center justify-center shadow-lg shadow-primary-dark/30 border-4 border-surface-container-lowest active:scale-95 transition-all hover:bg-on-primary-fixed-variant"
            >
              <Plus size={24} strokeWidth={2.5} />
            </button>
            <span className="text-[10px] font-semibold text-primary-dark mt-0.5">
              Create
            </span>
          </div>

          {/* Right items: Analytics, Settings */}
          <Link
            href="/analytics"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs transition-colors min-w-[56px] ${
              pathname === "/analytics"
                ? "text-primary-dark font-bold"
                : "text-secondary hover:text-on-surface font-medium"
            }`}
          >
            <BarChart size={20} />
            <span className="text-[10px] mt-0.5">Analytics</span>
          </Link>

          <Link
            href="/settings"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs transition-colors min-w-[56px] ${
              pathname === "/settings"
                ? "text-primary-dark font-bold"
                : "text-secondary hover:text-on-surface font-medium"
            }`}
          >
            <Settings size={20} />
            <span className="text-[10px] mt-0.5">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Global Quick Create Modal */}
      {showCreateModal && (
        <CreateLinkModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
}
