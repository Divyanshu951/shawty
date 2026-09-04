"use client";
import Image from "next/image";
import profile from "@/public/profile.png";
import {
  BarChart,
  HelpCircle,
  LayoutDashboardIcon,
  Link2,
  Loader2Icon,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import NavItem from "./nav-Item";
import LogoutButton from "../logout-button";
import { redirect } from "next/navigation";

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
  const { data: session, isPending, error } = useSession();

  if (isPending)
    return (
      <aside className="bg-surface-container-lowest border-outline-variant/50 hidden h-screen w-64 flex-col items-center justify-center space-y-2 border-r p-4 shadow-sm md:flex">
        <Loader2Icon className="size-14 animate-spin" />
      </aside>
    );

  if (!session || error) redirect("/auth/login");

  const { name, image } = session.user;

  return (
    <aside className="bg-surface-container-lowest border-outline-variant/50 hidden h-screen w-64 flex-col space-y-2 border-r p-4 shadow-sm md:flex">
      <div className="flex items-center gap-4 px-4 py-6">
        <div className="bg-surface-variant h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <Image src={image ?? profile} width={50} height={50} alt="avatar" />
        </div>
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary-dark text-xl leading-tight font-bold">
            {name ?? "Guest"}
          </h1>
          <p className="font-body-sm text-body-sm text-secondary">Free Plan</p>
        </div>
      </div>
      <div className="border-outline-variant/30 border-t" />

      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} />
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
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
