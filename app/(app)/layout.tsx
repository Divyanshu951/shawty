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
    <div className="flex min-h-screen">
      <Sidebar user={session.user} />
      <main className="flex-1 px-12 py-14">{children}</main>
    </div>
  );
}
