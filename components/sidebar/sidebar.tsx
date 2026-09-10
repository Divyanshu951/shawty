"use client";
import Image from "next/image";
import profile from "@/public/profile.png";
import {
  ArrowLeft,
  BarChart,
  CrownIcon,
  LayoutDashboardIcon,
  Link2,
  Settings,
} from "lucide-react";
import { User } from "@/lib/auth-client";
import NavItem from "./nav-Item";
import LogoutButton from "../logout-button";
import ThemeToggle from "../theme-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  user: User;
};

const navItems = [
  {
    label: "Overview",
    icon: LayoutDashboardIcon,
    path: "dashboard",
  },
  {
    label: "Links",
    icon: Link2,
    path: "links",
  },
  {
    label: "Analytics",
    icon: BarChart,
    path: "analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "settings",
  },
];

const Sidebar = ({ user }: SidebarProps) => {
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);

  const { name, image } = user;

  return (
    <aside
      className={cn(
        collapseMenu ? "w-16 p-2" : "w-64 p-4",
        "bg-surface-container-lowest border-outline-variant/50 relative hidden h-full md:flex flex-col shrink-0 border-r shadow-sm transition-all duration-300 z-20",
      )}
    >
      {/* Collapse/Expand Toggle Button positioned on the border */}
      <button
        className="bg-surface-container-lowest border-outline-variant/50 text-secondary hover:text-on-surface absolute top-6 -right-3.5 z-30 flex size-7 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-all hover:scale-110"
        title={collapseMenu ? "Expand Menu" : "Collapse Menu"}
        onClick={() => setCollapseMenu((prev) => !prev)}
      >
        <ArrowLeft
          size={14}
          className={cn(
            collapseMenu ? "rotate-180" : "rotate-0",
            "transition-transform duration-200",
          )}
        />
      </button>

      {/* User info header */}
      <div
        className={cn(
          collapseMenu && "justify-center",
          "flex shrink-0 items-center gap-3 px-3 py-4",
        )}
      >
        <div
          title={name}
          className={cn(
            collapseMenu ? "size-8" : "size-10",
            "bg-surface-variant shrink-0 overflow-hidden rounded-full",
          )}
        >
          <Image src={image ?? profile} width={50} height={50} alt="avatar" />
        </div>
        {!collapseMenu && (
          <div className="min-w-0 flex-1">
            <h1 className="font-headline-lg text-primary-dark text-lg leading-tight font-bold truncate">
              {name ?? "Guest"}
            </h1>
            <p className="font-body-sm text-body-sm text-secondary text-xs">
              Free Plan
            </p>
          </div>
        )}
      </div>

      <div className="border-outline-variant/30 shrink-0 border-t" />

      {/* Nav items (scrolls internally if viewport is small) */}
      <nav className="mt-2 flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} collapseMenu={collapseMenu} />
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-outline-variant/30 mt-auto shrink-0 space-y-4 border-t pt-4">
        <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm flex w-full cursor-pointer items-center justify-center rounded-md py-3 font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
          {!collapseMenu ? "Upgrade to Pro" : <CrownIcon size={18} />}
        </button>
        <div className="space-y-1">
          <ThemeToggle collapseMenu={collapseMenu} />
          <LogoutButton collapseMenu={collapseMenu} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
