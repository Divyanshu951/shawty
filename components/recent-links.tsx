"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  Clock,
  BarChart3,
  Link2,
} from "lucide-react";

type RecentLink = {
  id: string;
  slug: string;
  destinationUrl: string;
  clickCount: number;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
};

type RecentLinksProps = {
  links: RecentLink[];
  onOpenCreate?: () => void;
};

export default function RecentLinks({ links }: RecentLinksProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (slug: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`https://link.shawty.online/${slug}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const truncateUrl = (url: string, maxLen = 40) => {
    if (url.length <= maxLen) return url;
    return url.slice(0, maxLen) + "…";
  };

  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 rounded-xl border p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-headline-lg text-on-surface text-base sm:text-lg font-semibold">
            Recent Shawties
          </h3>
          <p className="font-body-sm text-xs text-secondary mt-0.5">
            Your most recently created short links
          </p>
        </div>

        <Link
          href="/links"
          className="text-primary hover:text-primary-dark font-body-sm flex items-center gap-1.5 text-xs font-semibold transition-colors"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      {links.length > 0 ? (
        <div className="divide-outline-variant/20 divide-y">
          {links.map((link) => {
            const shortUrl = `https://link.shawty.online/${link.slug}`;
            const isCopied = copiedId === link.id;
            const isExpired =
              link.expiresAt && new Date(link.expiresAt) < new Date();

            return (
              <div
                key={link.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 gap-2"
              >
                <div className="min-w-0 flex-1 pr-2 sm:pr-4">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label-mono text-primary-dark hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors truncate max-w-full"
                    >
                      <span className="truncate">link.shawty.online/{link.slug}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>

                    {!link.isActive && (
                      <span className="bg-surface-container text-secondary rounded-full px-2 py-0.5 text-[11px] font-medium">
                        Inactive
                      </span>
                    )}
                    {isExpired && (
                      <span className="bg-error-container text-on-error-container rounded-full px-2 py-0.5 text-[11px] font-medium">
                        Expired
                      </span>
                    )}

                    {/* Mobile-only clicks badge */}
                    <span className="bg-surface-container/60 text-secondary rounded-full px-2 py-0.5 text-[11px] font-medium flex items-center gap-1 sm:hidden">
                      <BarChart3 size={10} />
                      {link.clickCount}
                    </span>
                  </div>

                  <p
                    className="font-body-sm text-secondary truncate text-xs mt-0.5"
                    title={link.destinationUrl}
                  >
                    → {truncateUrl(link.destinationUrl)}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <div className="hidden text-right text-xs text-secondary sm:block">
                    <div className="flex items-center gap-1 justify-end font-medium text-on-surface">
                      <BarChart3 size={13} />
                      {link.clickCount}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-secondary mt-0.5">
                      <Clock size={11} />
                      {new Date(link.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(link.slug, link.id)}
                    title="Copy short link"
                    className="text-secondary hover:text-on-surface hover:bg-surface-container cursor-pointer rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
                  >
                    {isCopied ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-surface-container text-secondary mb-3 flex size-12 items-center justify-center rounded-full">
            <Link2 size={22} />
          </div>
          <p className="font-body-sm text-sm text-on-surface font-medium">
            No links created yet
          </p>
          <p className="font-body-sm text-xs text-secondary mt-1">
            Shorten a link using the form above to see it here!
          </p>
        </div>
      )}
    </div>
  );
}
