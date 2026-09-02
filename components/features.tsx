import React from "react";
import { Gauge, BarChart3, ShieldCheck, Copy } from "lucide-react";

const ShawtyFeaturePanel = () => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-between bg-black p-10 text-zinc-100 select-none md:p-12">
      <div className="pointer-events-none absolute top-[-8%] left-[-8%] h-80 w-[320px] rounded-full bg-amber-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.15]" />

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="font-bricolage text-2xl font-bold tracking-tight text-white">
          Shawty.online
        </span>
      </div>

      {/* Core content */}
      <div className="relative z-10 my-auto max-w-md py-8">
        <div className="text-md font-jakarta mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium">
          yo, shawty 👋 got a long link for me?
        </div>

        <h1 className="mb-3 font-(family-name:--font-bricolage) text-[2.15rem] leading-[1.1] font-bold tracking-tight text-white">
          Long story short,
          <br />
          <span className="text-primary">that&apos;s kind of the point.</span>
        </h1>

        <p
          className="mb-7 text-[13.5px] leading-relaxed text-zinc-500"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Shawty turns your longest, ugliest URLs into short ones worth sharing
          — then tells you exactly who clicked, when, and from where.
        </p>

        {/* Terminal-style link preview */}
        <div className="mb-8 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
          <div
            className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-[11px] text-zinc-600"
            style={{ fontFamily: "var(--font-space)" }}
          >
            <span>before</span>
            <span>after</span>
          </div>
          <div
            className="flex flex-col gap-1.5 px-3 py-3 text-[11.5px]"
            style={{ fontFamily: "var(--font-space)" }}
          >
            <div className="truncate text-zinc-600 line-through decoration-zinc-700">
              yourapp.com/products/summer-sale/2026/index?ref=email
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary">
                shawty.online/<span className="text-white">summer</span>
              </span>
              <Copy className="h-3 w-3 text-zinc-600" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <Feature
            icon={<Gauge className="h-4 w-4" strokeWidth={2} />}
            title="Short and to the point"
            desc="Custom aliases — shaw.ty/your-brand, not a string of noise"
          />
          <Feature
            icon={<BarChart3 className="h-4 w-4" strokeWidth={2} />}
            title="Shawty doesn't lie"
            desc="Real-time clicks, locations, and referrers, down to the second"
          />
          <Feature
            icon={<ShieldCheck className="h-4 w-4" strokeWidth={2} />}
            title="Shawty's on lock"
            desc="HTTPS routing, link expiry, and password protection built in"
          />
        </div>
      </div>

      {/* Footer stat */}
      <div
        className="relative z-10 flex items-center justify-between border-t border-zinc-900 pt-5 text-[11px] text-zinc-600"
        style={{ fontFamily: "var(--font-space)" }}
      >
        <span>4,208,119 links shortened</span>
        <span>and counting</span>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3.5">
    <div className="text-primary mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950">
      {icon}
    </div>
    <div>
      <div className="font-[family-name:var(--font-bricolage)] text-[13.5px] font-semibold text-zinc-100">
        {title}
      </div>
      <div
        className="text-[12px] leading-relaxed text-zinc-500"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {desc}
      </div>
    </div>
  </div>
);

export default ShawtyFeaturePanel;
