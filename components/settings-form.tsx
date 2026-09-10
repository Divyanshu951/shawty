"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/lib/auth-client";
import { updateUserProfile } from "@/app/settings-actions";
import profilePlaceholder from "@/public/profile.png";
import {
  Check,
  Loader2Icon,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

type SettingsFormProps = {
  user: User;
  totalLinks: number;
};

export default function SettingsForm({ user, totalLinks }: SettingsFormProps) {
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const result = await updateUserProfile(name);
    if (result.status === "success") {
      setMessage({ type: "success", text: result.message });
    } else {
      setMessage({ type: "error", text: result.error });
    }
    setIsSaving(false);
  };

  return (
    <section className="bg-surface-container-lowest border-outline-variant/30 group relative grow justify-between overflow-hidden rounded-xl border p-6 shadow-sm md:p-8">
      <div className="bg-surface-container/50 absolute top-0 right-0 -z-10 h-32 w-32 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>

      <div className="border-outline-variant/30 mb-6 flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="font-headline-lg text-on-surface text-xl font-semibold">
            Profile Settings
          </h3>
          <p className="font-body-sm text-secondary mt-0.5 text-xs">
            Update your personal details and account preferences
          </p>
        </div>
        <div className="text-primary-dark flex size-8 items-center justify-center rounded-lg bg-white/20">
          <UserIcon size={16} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar and basic info */}
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative">
            <div className="border-surface-container-high relative size-20 overflow-hidden rounded-full border-2 shadow-sm sm:size-24">
              <Image
                className="object-cover"
                alt="Avatar"
                src={user.image || profilePlaceholder}
                fill
                sizes="96px"
              />
            </div>
          </div>

          <div className="w-full flex-1 space-y-4">
            <div>
              <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
                Display Name
              </label>
              <input
                className="bg-surface border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-body-md text-on-surface h-12 w-full rounded-lg border px-4 text-base transition-all outline-none focus:ring-1 md:text-sm"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address (read only / auth provider managed) */}
        <div>
          <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
            Email Address
          </label>
          <div className="relative flex items-center">
            <input
              className="bg-surface-container border-outline-variant/50 text-secondary font-body-md h-12 w-full cursor-not-allowed rounded-lg border px-4 text-base opacity-80 md:text-sm"
              type="email"
              value={user.email}
              disabled
            />
            <span className="text-secondary absolute right-4 flex items-center gap-1 text-xs">
              <ShieldCheck size={14} className="text-green-500" />
              Verified
            </span>
          </div>
          <p className="text-secondary mt-1 text-xs">
            Email is managed by your authentication provider.
          </p>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            className={`rounded-lg p-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Save button */}
        <div className="flex flex-col items-start justify-between gap-3 pt-2 sm:flex-row sm:items-center">
          <p className="font-body-sm text-secondary text-xs">
            Account created:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2.5"
          >
            {isSaving && <Loader2Icon size={16} className="animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
