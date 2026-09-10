import MobileHeader from "@/components/mobile-header";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import Sidebar from "@/components/sidebar/sidebar";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:h-screen md:overflow-hidden md:flex-row">
      <MobileHeader user={session.user} />
      <Sidebar user={session.user} />
      <div className="flex-1 md:overflow-y-auto min-w-0 flex flex-col pb-20 md:pb-0">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 md:px-10 md:py-10">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
