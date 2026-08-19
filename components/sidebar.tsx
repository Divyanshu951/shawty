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

const navItems = [
  {
    label: "Dashboard",
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
    <aside className="bg-surface-container-lowest border-outline-variant/50 flex h-screen w-64 flex-col space-y-2 border-r p-4 shadow-sm">
      <div className="mb-8 flex items-center gap-4 px-4 py-6">
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

      <nav className="flex flex-1 flex-col gap-1">
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

  console.log(path, pathName);

  return (
    <Link
      className={cn(
        pathName === `/${path}`
          ? "bg-primary text-background-neutral font-bold shadow-sm"
          : "hover:bg-surface-variant/50 text-on-primary-container transition-colors duration-200",
        "group flex items-center gap-3 rounded-md px-4 py-3 transition-transform",
      )}
      href={`/${path}`}
    >
      <span className="flex items-center gap-2">
        <Icon
          className={cn(
            pathName !== `/${path}` &&
              "group-hover:text-primary-dark transition-colors duration-200",
          )}
          size={20}
        />
        <span className="font-body-sm text-body-sm">{label}</span>
      </span>
    </Link>
  );
};

export default Sidebar;
