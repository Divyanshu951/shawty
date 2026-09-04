import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavItemTypes = {
  item: {
    label: string;
    icon: LucideIcon;
    path: string;
  };
};

const NavItem = ({ item }: NavItemTypes) => {
  const pathName = usePathname();
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

export default NavItem;
