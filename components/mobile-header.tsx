"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  LayoutDashboardIcon,
  Link2,
  BarChart,
  Settings,
  CrownIcon,
} from "lucide-react";
import { User } from "@/lib/auth-client";
import profilePlaceholder from "@/public/profile.png";
import LogoutButton from "./logout-button";
import ThemeToggle from "./theme-toggle";

type MobileHeaderProps = {
  user: User;
};

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

export default function MobileHeader({ user }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top App Bar */}
      <header className="bg-surface-container-lowest border-outline-variant/30 sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-4 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="bg-primary-dark flex size-8 items-center justify-center rounded-lg text-white font-bold text-base shadow-xs">
            S
          </div>
          <span className="font-headline-lg text-primary-dark text-lg font-bold">
            Shawty
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="border-outline-variant/50 relative size-8 overflow-hidden rounded-full border">
            <Image
              src={user.image || profilePlaceholder}
              alt="avatar"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-secondary hover:text-on-surface hover:bg-surface-container flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="bg-surface-container-lowest border-outline-variant/30 fixed top-16 right-0 bottom-0 flex w-72 max-w-[85vw] flex-col border-l p-5 shadow-2xl animate-in slide-in-from-right duration-200 overflow-y-auto">
            {/* User Profile Card */}
            <div className="border-outline-variant/30 mb-4 flex items-center gap-3 border-b pb-4">
              <div className="border-outline-variant/40 relative size-10 overflow-hidden rounded-full border">
                <Image
                  src={user.image || profilePlaceholder}
                  alt="avatar"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-headline-lg text-on-surface text-sm font-semibold truncate">
                  {user.name || "User"}
                </p>
                <p className="font-body-sm text-secondary text-xs truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-body-sm flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-dark text-on-primary font-semibold shadow-xs"
                        : "text-secondary hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="border-outline-variant/30 space-y-3 border-t pt-4">
              <button className="bg-primary-dark text-on-primary font-body-sm flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold shadow-xs">
                <CrownIcon size={15} />
                <span>Upgrade to Pro</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <ThemeToggle collapseMenu={false} />
                <LogoutButton collapseMenu={false} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
