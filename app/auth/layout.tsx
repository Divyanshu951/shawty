import getSession from "@/lib/get-session";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block md:basis-3/4">
        <Image
          src="/signup-poster-3.png"
          alt="poster"
          fill
          className="object-cover"
          priority
        />
      </div>

      <main className="flex-1 md:basis-1/4">{children}</main>
    </div>
  );
}
