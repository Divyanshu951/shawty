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
        "bg-surface-container-lowest border-outline-variant/50 hidden h-screen flex-col space-y-2 border-r shadow-sm transition-all duration-300 md:flex",
      )}
    >
      <div
        className={cn(
          collapseMenu && "justify-center",
          "flex items-center gap-4 px-4 py-6",
        )}
      >
        <div
          title={name}
          className={cn(
            collapseMenu ? "size-8" : "size-12",
            "bg-surface-variant shrink-0 overflow-hidden rounded-full",
          )}
        >
          <Image src={image ?? profile} width={50} height={50} alt="avatar" />
        </div>
        {!collapseMenu && (
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary-dark text-xl leading-tight font-bold">
              {name ?? "Guest"}
            </h1>
            <p className="font-body-sm text-body-sm text-secondary">
              Free Plan
            </p>
          </div>
        )}
      </div>
      <div className="border-outline-variant/30 relative border-t">
        <button
          className="bg-background border-secondary-container absolute -top-4 -right-8 z-10 flex cursor-pointer items-center justify-center rounded-full border p-2"
          title={collapseMenu ? "Expand Menu" : "Collapse Menu"}
          onClick={() => setCollapseMenu((prev) => !prev)}
        >
          <ArrowLeft
            size={18}
            className={cn(
              collapseMenu ? "rotate-180" : "rotate-0",
              "transition-transform duration-200",
            )}
          />
        </button>
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} collapseMenu={collapseMenu} />
        ))}
      </nav>

      <div className="border-outline-variant/30 mt-auto space-y-4 border-t pt-4">
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
