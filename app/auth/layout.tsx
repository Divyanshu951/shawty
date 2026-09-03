import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
