import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = ({ collapseMenu }: { collapseMenu: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-on-surface-variant hover:bg-surface-variant/50 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 transition-colors duration-200"
    >
      <div className="flex w-full justify-between disabled:opacity-70">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Loader2Icon size={18} className="animate-spin" />
          ) : (
            <LogOutIcon size={18} />
          )}
          {!collapseMenu && (
            <span
              className={cn(
                "font-body-sm text-body-sm",
                isLoading && "opacity-35",
              )}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default LogoutButton;
