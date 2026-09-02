"use client";
import Image from "next/image";
import profile from "@/public/profile.png";
import {
  BarChart,
  HelpCircle,
  LayoutDashboardIcon,
  Link2,
  LogOutIcon,
  type LucideIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="bg-surface-container-lowest border-outline-variant/50 hidden h-screen w-64 flex-col space-y-2 border-r p-4 shadow-sm md:flex">
      <div className="flex items-center gap-4 px-4 py-6">
        <div className="bg-surface-variant h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <Image src={profile} alt="avatar" />
        </div>
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary-dark text-xl leading-tight font-bold">
            Shawty
          </h1>
          <p className="font-body-sm text-body-sm text-secondary">
            Premium Plan
          </p>
        </div>
      </div>
      <div className="border-outline-variant/30 border-t" />

      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} pathName={pathName} />
        ))}
      </nav>

      <div className="border-outline-variant/30 mt-auto space-y-4 border-t pt-4">
        <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant w-full cursor-pointer rounded-md py-3 font-semibold shadow-sm transition-colors">
          Upgrade to Pro
        </button>
        <div className="space-y-1">
          <button className="text-on-surface-variant hover:bg-surface-variant/50 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 transition-colors duration-200">
            <HelpCircle size={18} />
            <span className="font-body-sm text-body-sm">Help Center</span>
          </button>
          <button className="text-on-surface-variant hover:bg-surface-variant/50 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 transition-colors duration-200">
            <LogOutIcon size={18} />
            <span className="font-body-sm text-body-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

type NavItemTypes = {
  pathName: string;
  item: {
    label: string;
    icon: LucideIcon;
    path: string;
  };
};

const NavItem = ({ item, pathName }: NavItemTypes) => {
  const { icon: Icon, label, path } = item;

  const isActive = pathName === `/${path}`;

  return (
    <Link
      href={`/${path}`}
      className="group relative flex items-center gap-3 rounded-md px-4 py-2"
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pill"
          className="bg-primary absolute inset-0 rounded-md shadow-2xl"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        <Icon
          size={20}
          className={cn(
            isActive
              ? "text-background-neutral"
              : "text-on-primary-container group-hover:text-primary-dark transition-colors duration-200",
          )}
        />

        <span
          className={cn(
            "font-body-sm text-body-sm",
            isActive ? "text-background-neutral" : "text-on-primary-container",
          )}
        >
          {label}
        </span>
      </span>
    </Link>
  );
};
export default Sidebar;
