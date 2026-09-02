import ShawtyFeatureShowcase from "@/components/features";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="hidden h-screen grow bg-red-200 md:block">
        <Image
          src="/signup-poster.png"
          width={417}
          height={1000}
          alt="poster"
        />
        {/* <ShawtyFeatureShowcase /> */}
      </div>
      <main className="flex-1 basis-1/2">{children}</main>
    </div>
  );
}
