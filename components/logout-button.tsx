import { signOut } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="text-on-surface-variant hover:bg-surface-variant/50 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 transition-colors duration-200"
    >
      <LogOutIcon size={18} />
      <span className="font-body-sm text-body-sm">Logout</span>
    </button>
  );
};

export default LogoutButton;
