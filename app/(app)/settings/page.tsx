import getSession from "@/lib/get-session";
import { Edit2, StarCheck } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/signup");
  }

  const { name, email, image } = session?.user;

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Account Settings
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage your profile and billing details.{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <section className="bg-surface-container-lowest border-outline-variant/30 group w- relative grow justify-between overflow-hidden rounded-xl border p-6 shadow-[0_4px_12px_rgba(15,23,42,0.05)] md:p-8">
          <div className="bg-surface-container/50 absolute top-0 right-0 -z-10 h-32 w-32 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
          <h3 className="font-headline-lg text-on-surface border-outline-variant/30 mb-6 border-b pb-4 text-xl">
            Profile Settings
          </h3>
          <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative">
              <Image
                className="border-surface-container-high h-24 w-24 rounded-full border-2 object-cover shadow-sm"
                alt="Avatar"
                src={image!}
                height={100}
                width={100}
              />
              <button className="bg-primary-dark text-on-primary hover:bg-on-primary-fixed-variant absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  <Edit2 size={16} />
                </span>
              </button>
            </div>
            <div className="w-full flex-1 space-y-4">
              <div>
                <label className="font-label-mono text-label-mono text-secondary mb-1 block">
                  Name
                </label>
                <input
                  className="bg-surface border-outline-variant/50 focus:border-primary focus:ring-primary font-body-md text-body-md text-on-surface h-12 w-full rounded-lg border px-4 transition-all outline-none focus:ring-1"
                  type="text"
                  value={name}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-label-mono text-label-mono text-secondary mb-1 block">
                Email Address
              </label>
              <input
                className="bg-surface border-outline-variant/50 focus:border-primary focus:ring-primary font-body-md text-body-md text-on-surface h-12 w-full rounded-lg border px-4 transition-all outline-none focus:ring-1"
                type="email"
                value={email}
              />
            </div>
            <div className="flex justify-end pt-4">
              <button className="bg-primary-dark text-on-primary font-body-sm text-body-sm cursor-pointer rounded-md px-6 py-2.5 font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                Save Changes
              </button>
            </div>
          </div>
        </section>

        <section className="relative flex w-80 flex-col justify-between overflow-hidden rounded-xl bg-[#9d4300] p-6 text-white shadow-[0_12px_24px_rgba(157,67,0,0.15)] md:p-8">
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
          <div className="bg-on-primary-fixed/20 absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-label-mono text-label-mono text-primary-fixed-dim tracking-wider uppercase">
                Current Plan
              </span>
              <span className="material-symbols-outlined text-white/50">
                <StarCheck size={22} />
              </span>
            </div>
            <h3 className="font-display-lg mb-1 text-4xl font-bold">Premium</h3>
            <p className="font-body-sm text-body-sm text-primary-fixed mb-8">
              $29.00 / month
            </p>
            <div className="mb-8 space-y-4">
              <div className="mb-1 flex items-end justify-between">
                <span className="font-label-mono text-label-mono text-primary-fixed">
                  Links Generated
                </span>
                <span className="font-label-mono text-label-mono font-bold">
                  8,402 / 10,000
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/20">
                <div className="relative h-full w-[84%] rounded-full bg-white">
                  <div className="absolute top-0 right-0 h-full w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                </div>
              </div>
              <p className="font-jakarta text-primary-fixed text-right text-base">
                Resets in 12 days
              </p>
            </div>
          </div>
          <button className="font-body-sm w-full cursor-pointer rounded-lg bg-white py-3 font-bold text-[#9d4300] shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            Manage Billing
          </button>
        </section>
      </div>
    </div>
  );
};

export default Page;
