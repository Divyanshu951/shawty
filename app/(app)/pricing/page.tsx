import { Check, CheckCircle, X } from "lucide-react";
const Pricing = () => {
  return (
    <main className="px-margin-mobile md:px-margin-desktop 4 relative mx-auto flex w-full flex-grow flex-col items-center overflow-hidden font-mono">
      <div className="bg-primary-fixed/20 pointer-events-none absolute top-0 left-1/2 -z-10 flex -translate-x-1/2 rounded-full opacity-50 blur-[100px]"></div>
      <div className="mb-16">
        <h1 className="text-display-lg text-on-surface mb-4 text-center">
          Public Beta — Everything is Free
          {/* Simple, transparent pricing */}
        </h1>
        <p className="font-body-md text-body-md text-secondary text-center">
          {/* Your URLs deserve a shawty makeover. Choose the plan that fits your
          scale, from personal projects to enterprise infrastructure. */}
          Shawty is currently under active development and in its public beta
          phase. Every feature available today can be used free of charge while
          we build, test, and refine the platform. Pricing plans shown elsewhere
          are not active yet and will be announced before beta ends.
        </p>
      </div>
      <div className="flex w-full gap-6">
        <div className="bg-surface-container-lowest border-outline-variant hover:shadow-level-1 group relative z-10 flex h-full flex-col rounded-xl border p-8 transition-all duration-300">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary mb-2 transition-colors">
              Free
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">
                $0
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                /mo
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-4">
              Perfect for side projects and personal use.
            </p>
          </div>
          <div className="border-outline-variant/30 mb-8 w-full border-t"></div>
          <ul className="mb-8 flex flex-grow flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Up to 100 links/mo
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Basic analytics (7 days)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Standard email support
              </span>
            </li>
            <li className="flex items-center gap-3 opacity-50">
              <span className="material-symbols-outlined text-outline text-[20px]">
                <X size={18} />
              </span>
              <span className="font-body-md text-body-md text-secondary">
                Custom domains
              </span>
            </li>
          </ul>
          <button className="bg-surface-container-lowest border-outline text-on-surface hover:shadow-level-1 font-label-mono text-label-mono hover:text-primary hover:border-primary mt-auto w-full rounded-lg border py-3 transition-shadow">
            Get Started
          </button>
        </div>
        <div className="bg-surface-container-lowest border-primary shadow-level-1 hover:shadow-level-2 relative z-20 flex h-full flex-col rounded-xl border-2 p-8 transition-all duration-300 md:-mt-4 md:mb-4">
          <div className="bg-primary text-on-primary font-label-mono text-label-mono absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] tracking-wider uppercase">
            Most Popular
          </div>
          <div className="mt-2 mb-8">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
              Pro
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-display-lg text-on-surface">
                $19
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                /mo
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-4">
              For professionals and growing teams who need more control.
            </p>
          </div>
          <div className="border-outline-variant/30 mb-8 w-full border-t"></div>
          <ul className="mb-8 flex flex-grow flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <CheckCircle size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface font-semibold">
                Up to 10,000 links/mo
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Advanced analytics (1 year)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Priority support
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                3 Custom domains
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                API Access
              </span>
            </li>
          </ul>
          <button className="bg-primary text-on-primary hover:bg-on-primary-fixed-variant font-label-mono text-label-mono mt-auto w-full rounded-lg py-3 transition-colors">
            Upgrade to Pro
          </button>
        </div>
        <div className="bg-surface-container-lowest border-outline-variant hover:shadow-level-1 group relative z-10 flex h-full flex-col rounded-xl border p-8 transition-all duration-300">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary mb-2 transition-colors">
              Enterprise
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-headline-lg text-on-surface">
                Custom
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-4">
              Volume pricing and advanced security for large organizations.
            </p>
          </div>
          <div className="border-outline-variant/30 mb-8 w-full border-t"></div>
          <ul className="mb-8 flex flex-grow flex-col gap-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Unlimited links
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Custom analytics &amp; reporting
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                24/7 Dedicated support &amp; SLA
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                Unlimited custom domains
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                <Check size={18} />
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                SSO &amp; Advanced Security
              </span>
            </li>
          </ul>
          <button className="bg-surface-container-lowest border-outline text-on-surface hover:shadow-level-1 font-label-mono text-label-mono hover:text-primary hover:border-primary mt-auto w-full rounded-lg border py-3 transition-shadow">
            Contact Sales
          </button>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
